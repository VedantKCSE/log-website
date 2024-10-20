import { jsPDF } from 'jspdf';

export const exportToPDF = (filteredLogs, selectedCategory) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255); // Primary color (blue)
    doc.text('Activity Logs', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(100); // Gray subtitle color
    doc.text(`Category: ${selectedCategory}`, 105, 30, { align: 'center' });
    doc.setFontSize(12);
    let yPosition = 40;

    if (filteredLogs.length === 0) {
        doc.text('No logs available to display.', 10, yPosition);
    } else {
        filteredLogs.forEach((log) => {
            const logText = `-> ${log.log}  ~   ${log.date}`;
            // const logTextWidth = doc.getTextWidth(logText);
            const pageWidth = doc.internal.pageSize.getWidth();
            const categoryX = pageWidth - 10 - doc.getTextWidth(log.category);

            doc.setTextColor(0, 0, 255);
            doc.text(logText, 10, yPosition);
            doc.setTextColor(255, 0, 0);
            doc.text(log.category, categoryX, yPosition);
            yPosition += 6;
        });
    }

    doc.save('logs.pdf');
};

export const exportLogs = (logs) => {
    const jsonLogs = JSON.stringify(logs);
    const blob = new Blob([jsonLogs], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'logs.json';
    link.click();
};

export const importLogs = (event, setLogs, logs) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const importedLogs = JSON.parse(e.target.result);
            const updatedLogs = [...importedLogs, ...logs]; // Append imported logs to existing logs
            setLogs(updatedLogs);
            localStorage.setItem('logs', JSON.stringify(updatedLogs));
        };
        reader.readAsText(file);
    }
};
