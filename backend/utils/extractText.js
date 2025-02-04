const pdfParse = require("pdf-parse");

async function extractTextFromFile(file) {
  let extractedText = "";

  if (file.contentType === "application/pdf") {
    console.log("📂 📜 Fichier PDF détecté :", file.filename);
    const text = await pdfParse(file.data);
    extractedText = text.text;
  } else {
    console.log("📂 📝 Fichier TXT détecté :", file.filename);
    extractedText = file.data.toString("utf-8");
  }

  console.log(
    "✅ Texte extrait :",
    extractedText || "⚠️ Aucun texte extrait !"
  );
  return extractedText;
}

module.exports = extractTextFromFile;
