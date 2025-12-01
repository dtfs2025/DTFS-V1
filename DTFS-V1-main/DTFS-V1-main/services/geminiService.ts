import {
    GoogleGenAI,
    Type,
} from "@google/genai";
import {
    Conversation,
    ChatMessage,
    Product,
    User,
    Order,
    Shipment,
    Vehicle,
    Driver,
    Dispute,
    MarketOpportunity,
    UserRole
} from "../types.ts";

// FIX: Initialize the GoogleGenAI client.
// This is the central access point to the Gemini API.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

type ChatHistory = { role: 'user' | 'model', parts: { text: string }[] };

// --- CHAT ---

export async function generateChatReply(conversation: Conversation, history: ChatHistory[]): Promise<string> {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are a helpful assistant on a trade finance platform. 
    You are chatting with ${conversation.name}, who is a ${conversation.role}. 
    The current conversation is about Trade ID: ${conversation.tradeId || 'N/A'}. 
    Be professional, concise, and helpful.`;

    const response = await ai.models.generateContent({
        model,
        contents: history,
        config: {
            systemInstruction,
        },
    });

    return response.text;
}

export async function generateChatSuggestions(conversation: Conversation, history: ChatHistory[], userRole: UserRole): Promise<string[]> {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are an AI assistant that suggests helpful, short, and professional replies in a chat on a trade finance platform.
    The user is a ${userRole}. The conversation is with ${conversation.name} (${conversation.role}).
    Based on the last message, suggest 3 distinct, actionable, and brief replies for the user.
    The suggestions should be relevant to international trade and logistics.`;

    const response = await ai.models.generateContent({
        model,
        contents: history,
        config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
            }
        },
    });

    try {
        const json = JSON.parse(response.text);
        return Array.isArray(json) ? json.slice(0, 3) : [];
    } catch {
        return [];
    }
}

// --- AI ASSISTANT ---

export async function getAIAssistantReply(history: ChatHistory[]): Promise<string> {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are an expert assistant for the DTFS (Digital Trade and Finance Service) platform. 
    Users will ask questions about international trade, logistics, finance, and how to use the platform.
    Provide concise, accurate, and helpful answers. If you don't know the answer, say so.`;

    const response = await ai.models.generateContent({
        model,
        contents: history,
        config: {
            systemInstruction,
        },
    });
    return response.text;
}


// --- DOCUMENT WIZARD ---

export async function generateDocument(documentTitle: string, formDataJson: string): Promise<string> {
    const model = 'gemini-2.5-flash';
    const contents = `Generate a complete, professional HTML document for a "${documentTitle}".
    Use the following JSON data to populate the document: ${formDataJson}.
    - The HTML should be well-structured and include a <head> with a title and basic styles.
    - Use inline CSS for styling to ensure compatibility with printing and email. Use a clean, modern, and professional design.
    - Use tables for itemized lists (like line items in an invoice).
    - Format dates, currency, and addresses appropriately.
    - Do not include any explanation, just return the raw HTML code starting with <!DOCTYPE html>.`;

    const response = await ai.models.generateContent({ model, contents });
    return response.text.replace(/```html/g, '').replace(/```/g, '').trim();
}

// --- HEADER GLOBAL SEARCH ---

export async function performGlobalSearch(
    query: string,
    data: {
        products: Product[];
        orders: Order[];
        shipments: Shipment[];
        users: Omit<User, 'permissions'>[];
    }
): Promise<{ products: string[]; orders: string[]; shipments: string[]; users: string[] }> {
    const model = 'gemini-2.5-flash';
    const simplifiedData = {
        products: data.products.map(({ id, name, description }) => ({ id, name, description })),
        orders: data.orders.map(({ id, productName, customer }) => ({ id, productName, customer })),
        shipments: data.shipments.map(({ id, trackingNumber, origin, destination }) => ({ id, trackingNumber, origin, destination })),
        users: data.users.map(({ id, name, email, role }) => ({ id, name, email, role })),
    };
    const contents = `You are an intelligent search engine for a logistics platform. Search the following JSON data for items that match the user query: "${query}".
    Search across all fields for relevant matches. The query might be an ID, a name, a location, or a description. Be flexible in your matching.
    Return a JSON object with keys "products", "orders", "shipments", and "users". Each key should contain an array of the IDs of the matching items.
    Data:
    ${JSON.stringify(simplifiedData)}`;

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    products: { type: Type.ARRAY, items: { type: Type.STRING } },
                    orders: { type: Type.ARRAY, items: { type: Type.STRING } },
                    shipments: { type: Type.ARRAY, items: { type: Type.STRING } },
                    users: { type: Type.ARRAY, items: { type: Type.STRING } },
                }
            }
        },
    });

    try {
        return JSON.parse(response.text);
    } catch {
        return { products: [], orders: [], shipments: [], users: [] };
    }
}

// --- PRODUCT DISCOVERY ---

export async function recommendProducts(query: string, allProducts: Product[]): Promise<(string | number)[]> {
    const model = 'gemini-2.5-flash';
    const productList = allProducts.map(({ id, name, description }) => ({ id, name, description }));
    const contents = `Based on the user's search query "${query}", recommend the most relevant products from the following list.
    Consider the product names and descriptions. Return a JSON array of the product IDs that are the best matches.
    Product list: ${JSON.stringify(productList)}`;

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: { type: Type.STRING } // IDs can be numbers or strings
            }
        },
    });

    try {
        return JSON.parse(response.text);
    } catch {
        return [];
    }
}

// --- PROFILE ---

export async function generateProfileSummary(user: User, stats: { totalProducts: number; totalOrders: number; badges: string[] }): Promise<string> {
    const model = 'gemini-2.5-flash';
    const contents = `Generate a brief, encouraging, one-sentence professional summary for a user profile.
    The user is a ${user.role} named ${user.name}.
    Their stats are: ${stats.totalOrders} completed orders, ${stats.totalProducts} products listed.
    They have earned the following badges: ${stats.badges.join(', ')}.
    Write the summary in the first person, as if the user is describing themselves. Make it sound accomplished and professional.`;

    const response = await ai.models.generateContent({ model, contents });
    return response.text.replace(/"/g, '');
}

// --- PRODUCT MANAGEMENT ---

export async function generateProductDetails(prompt: string): Promise<{ name: string; description: string; price: number }> {
    const model = 'gemini-2.5-flash';
    const contents = `Based on the user prompt "${prompt}", generate details for a new product.
    Provide a catchy, marketable product name.
    Write a compelling, professional product description (maximum 2 sentences).
    Suggest a realistic price in USD (as a number, no symbols).
    Return a JSON object with keys "name", "description", and "price".`;

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    price: { type: Type.NUMBER },
                }
            }
        },
    });

    try {
        return JSON.parse(response.text);
    } catch {
        return { name: '', description: '', price: 0 };
    }
}

export async function generateProductImage(prompt: string): Promise<string> {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `A high-quality, professional e-commerce product photograph of: ${prompt}. Clean, white background, studio lighting, sharp focus.`,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
        },
    });

    const base64ImageBytes = response.generatedImages[0]?.image.imageBytes;
    return base64ImageBytes ? `data:image/png;base64,${base64ImageBytes}` : '';
}

// --- MARKET DEVELOPMENT ---
export async function getMarketOpportunities(productOrIndustry: string): Promise<MarketOpportunity[]> {
    const model = 'gemini-2.5-flash';
    const contents = `You are a trade analyst specializing in African markets.
    Identify 3-5 potential market opportunities for "${productOrIndustry}" within Africa.
    For each opportunity, provide a short, actionable title and a one-sentence description of the opportunity.
    Return a JSON array of objects, where each object has "id", "title", and "description" keys. The ID should be a unique string.`;

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                    },
                    required: ["id", "title", "description"]
                }
            }
        },
    });

    try {
        return JSON.parse(response.text);
    } catch {
        return [];
    }
}

// --- DISPUTE RESOLUTION ---
export async function analyzeDispute(dispute: Dispute, order: Order, messages: ChatMessage[]): Promise<{ summary: string; suggested_resolution: string; key_points: string[] }> {
    const model = 'gemini-2.5-flash';
    const contents = `Analyze the following trade dispute as an impartial mediator.
    - Dispute Details: ${JSON.stringify(dispute)}
    - Associated Order: ${JSON.stringify(order)}
    - Relevant Conversation History: ${JSON.stringify(messages.map(m => `${m.sender}: ${m.content}`))}
    
    Provide your analysis as a JSON object with the following keys:
    1. "summary": A brief, neutral summary of the dispute.
    2. "key_points": An array of 3-4 bullet points highlighting the most critical facts or claims from the conversation.
    3. "suggested_resolution": A clear, actionable, and fair suggested resolution to the dispute.`;

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING },
                    suggested_resolution: { type: Type.STRING },
                    key_points: { type: Type.ARRAY, items: { type: Type.STRING } },
                }
            }
        },
    });

    try {
        return JSON.parse(response.text);
    } catch {
        return { summary: 'Error analyzing dispute.', suggested_resolution: 'Manual review required.', key_points: [] };
    }
}

// --- ROUTE PLANNING ---
export async function optimizeRoutes(shipments: Shipment[], vehicles: Vehicle[], drivers: Driver[]): Promise<{ shipmentId: string; vehicleId: string; driverId: string; }[]> {
    const model = 'gemini-2.5-flash';
    const contents = `You are an expert logistics coordinator. Your task is to assign available vehicles and drivers to pending shipments in the most efficient way possible.
    - Pending Shipments to be routed: ${JSON.stringify(shipments.map(s => ({ id: s.id, origin: s.origin, destination: s.destination })))}
    - Available Vehicles: ${JSON.stringify(vehicles.map(v => ({ id: v.id, type: v.type, currentLocation: v.currentLocation })))}
    - Available Drivers: ${JSON.stringify(drivers.map(d => ({ id: d.id, name: d.name })))}

    Assign one vehicle and one driver to each shipment. Prioritize using vehicles closest to the shipment's origin.
    Return a JSON array of assignment objects, where each object has "shipmentId", "vehicleId", and "driverId".
    Only return assignments for the shipments provided.`;

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        shipmentId: { type: Type.STRING },
                        vehicleId: { type: Type.STRING },
                        driverId: { type: Type.STRING },
                    },
                    required: ["shipmentId", "vehicleId", "driverId"]
                }
            }
        },
    });

    try {
        return JSON.parse(response.text);
    } catch {
        return [];
    }
}