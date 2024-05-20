// components/ExportWizard.js

import React from 'react';
import { jsPDF } from 'jspdf';

const ExportWizard = ({ wizard }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const lineHeight = 4; // Reduced line height for tighter spacing
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const maxY = pageHeight - margin;
    const maxWidth = pageWidth - 2 * margin; // Ensures equal left and right margins
    let y = margin;

    const addText = (text, x, currentY, fontSize, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line) => {
        if (currentY + lineHeight > maxY) {
          doc.addPage();
          currentY = margin;
        }
        doc.text(line, x, currentY);
        currentY += lineHeight;
      });
      return currentY;
    };

    const addSection = (title, content) => {
      y = addText(title, margin, y + lineHeight / 2, 10, true);
      y = addText(content, margin, y + lineHeight / 2, 9);
    };

    y = addText('Wizard Profile', margin, y, 12, true);
    y += lineHeight;

    addSection('Name:', wizard.name);
    addSection('Characteristics:', `Levity: ${wizard.characteristics.levity}\nVitality: ${wizard.characteristics.vitality}\nWarding: ${wizard.characteristics.warding}`);

    y = addText('Primary School:', margin, y + lineHeight / 2, 10, true);
    y = addText(wizard.primarySchool, margin, y + lineHeight / 2, 9);

    y = addText('Primary Specialization:', margin, y + lineHeight / 2, 10, true);
    y = addText(wizard.primarySpecialization, margin, y + lineHeight / 2, 9);

    y = addText('Primary Spells:', margin, y + lineHeight / 2, 10, true);
    wizard.primarySpells.specialized.forEach((spell, index) => {
      y = addText(`${index + 1}. ${spell.name}`, margin, y + lineHeight / 2, 9, true);
      y = addText(`${spell.description}`, margin, y, 9);
    });

    y = addText('Universal Spells:', margin, y + lineHeight / 2, 10, true);
    Object.entries(wizard.primarySpells.universal).forEach(([category, spells]) => {
      y = addText(`${category.charAt(0).toUpperCase() + category.slice(1)}:`, margin, y + lineHeight / 2, 9, true);
      if (Array.isArray(spells)) {
        spells.forEach(spell => {
          y = addText(`- ${spell.name}`, margin, y + lineHeight / 2, 9, true);
          y = addText(`${spell.description}`, margin, y, 9);
        });
      } else {
        y = addText(`- ${spells.name}`, margin, y + lineHeight / 2, 9, true);
        y = addText(`${spells.description}`, margin, y, 9);
      }
    });

    y = addText('Secondary School:', margin, y + lineHeight / 2, 10, true);
    y = addText(wizard.secondarySchool, margin, y + lineHeight / 2, 9);

    y = addText('Secondary Spells:', margin, y + lineHeight / 2, 10, true);
    wizard.secondarySpells.forEach((spell, index) => {
      y = addText(`${index + 1}. ${spell.name}`, margin, y + lineHeight / 2, 9, true);
      y = addText(`${spell.description}`, margin, y, 9);
    });

    y = addText('Items:', margin, y + lineHeight / 2, 10, true);
    wizard.items.forEach((item, index) => {
      y = addText(`${index + 1}. ${item.name}`, margin, y + lineHeight / 2, 9, true);
      y = addText(`${item.description}`, margin, y, 9);
    });

    const fileName = wizard.name ? `${wizard.name.replace(/\s+/g, '_')}-profile.pdf` : 'wizard-profile.pdf';
    doc.save(fileName);
  };

  return (
    <div>
      <h2>Export Wizard Profile to PDF</h2>
      <button onClick={exportToPDF}>Export to PDF</button>
    </div>
  );
};

export default ExportWizard;
