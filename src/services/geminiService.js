export const callGeminiAPI = async (prompt) => {
  try {
    const apiKey = ""; // Injected by environment
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    
    if (!response.ok) throw new Error('Error en la API');
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, no pude procesar eso.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hubo un error de conexión con tu Coach IA. Intenta de nuevo.";
  }
};

