export function formatDateTime(dateTimeString: string): string {
    // Kiểm tra nếu dateTimeString không phải là chuỗi hợp lệ
    if (typeof dateTimeString !== 'string' || !dateTimeString.trim()) {
        throw new Error("Invalid input: dateTimeString must be a non-empty string.");
    }

    console.log(dateTimeString);

    const [datePart, ...timeParts] = dateTimeString.split(' ');

    const timePart = timeParts.join(' ');

    if (!datePart || !timePart) {
        throw new Error("Invalid dateTimeString format. Expected 'YYYY-MM-DD HH:MM - HH:MM'.");
    }

    // Chuyển phần ngày thành đối tượng Date bằng cách thêm "T00:00" để rõ ràng với thời gian
    const date = new Date(`${datePart}T00:00`);

    console.log("date", date);


    // Kiểm tra xem đối tượng Date có hợp lệ không
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

    // Lấy ngày, tháng, năm
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Trả về định dạng "DD-MM-YYYY HH:MM - HH:MM"
    return `${day}-${month}-${year} ${timePart}`;
}

export function convertDOBFormat(dateString: string): string {
    console.log(dateString);

    const dateParts = dateString.split('/');

    if (dateParts.length !== 3) {
        throw new Error('Invalid date format. Expected DD/MM/YYYY.');
    }

    // Gộp lại các phần ngày theo định dạng mới với dấu gạch ngang
    return dateParts.join('-');
}
