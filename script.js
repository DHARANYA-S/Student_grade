document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const marksForm = document.getElementById('marksForm');
    const marksEntry = document.getElementById('marksEntry');

    // Clear localStorage and table when page loads
    localStorage.removeItem('students');
    localStorage.removeItem('currentStudent');

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const regNo = document.getElementById('regNo').value;
        const name = document.getElementById('name').value;
        localStorage.setItem('currentStudent', JSON.stringify({ regNo, name }));
        document.getElementById('studentName').textContent = name;
        registrationForm.style.display = 'none';
        marksEntry.style.display = 'block';
    });

    marksForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const student = JSON.parse(localStorage.getItem('currentStudent'));
        const marks = [
            Number(document.getElementById('subject1').value),
            Number(document.getElementById('subject2').value),
            Number(document.getElementById('subject3').value),
            Number(document.getElementById('subject4').value),
            Number(document.getElementById('subject5').value)
        ];
        const total = marks.reduce((acc, mark) => acc + mark, 0);
        const grade = calculateGrade(total);
        student.marks = marks;
        student.total = total;
        student.grade = grade;
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        localStorage.removeItem('currentStudent');
        registrationForm.reset();
        marksForm.reset();
        registrationForm.style.display = 'block';
        marksEntry.style.display = 'none';
        populateStudentsTable();
    });

    const calculateGrade = (total) => {
        const average = total / 5;
        if (average >= 90) return 'A';
        if (average >= 80) return 'B';
        if (average >= 70) return 'C';
        if (average >= 60) return 'D';
        return 'F';
    };

    const populateStudentsTable = () => {
        const studentsTableBody = document.querySelector('#studentsTable tbody');
        studentsTableBody.innerHTML = '';
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.forEach((student) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.regNo}</td>
                <td>${student.name}</td>
                <td>${student.marks[0]}</td>
                <td>${student.marks[1]}</td>
                <td>${student.marks[2]}</td>
                <td>${student.marks[3]}</td>
                <td>${student.marks[4]}</td>
                <td>${student.total}</td>
                <td>${student.grade}</td>
            `;
            studentsTableBody.appendChild(row);
        });
    };

    // Populate table if there are any students
    populateStudentsTable();
});
