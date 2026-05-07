// --- ส่วนที่ 1: จัดการเรื่องสีและโหมด (Theme Management) ---

function toggleDarkMode() {
    const body = document.body;
    const btn = document.getElementById('modeBtn');
    
    // สลับคลาส 'dark-mode' ที่ตัว body
    body.classList.toggle('dark-mode');

    // ตรวจสอบว่าตอนนี้เป็นโหมดไหน แล้วเปลี่ยนข้อความบนปุ่ม
    if (body.classList.contains('dark-mode')) {
        btn.innerText = "☀️ Light Mode";
        localStorage.setItem("theme", "dark"); // จำว่าใช้โหมดมืด
    } else {
        btn.innerText = "✨ Switch Theme";
        localStorage.setItem("theme", "light"); // จำว่าใช้โหมดสว่าง
    }
}

// เช็คโหมดเดิมที่เคยเลือกไว้ตอนเปิดหน้าเว็บใหม่
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add('dark-mode');
    document.getElementById('modeBtn').innerText = "☀️ Light Mode";
}


// --- ส่วนที่ 2: จัดการรายการงาน (Task Management) ---

const input = document.getElementById('taskInput');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('taskList');

// โหลดรายการที่เคยบันทึกไว้ขึ้นมาแสดง
document.addEventListener('DOMContentLoaded', getTasks);

function addTask() {
    if (input.value.trim() === "") return;

    createTaskElement(input.value);
    saveLocalTasks(input.value);
    input.value = "";
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" onclick="removeTask(this)">ลบ</button>
    `;
    taskList.appendChild(li);
}

function removeTask(btn) {
    const taskItem = btn.parentElement;
    const taskText = taskItem.querySelector('span').innerText;
    removeLocalTasks(taskText);
    taskItem.remove();
}

// --- ส่วนที่ 3: ระบบบันทึกข้อมูลถาวร (Local Storage) ---

function saveLocalTasks(task) {
    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks.forEach(task => createTaskElement(task));
}

function removeLocalTasks(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const index = tasks.indexOf(task);
    if (index > -1) {
        tasks.splice(index, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// เชื่อมปุ่มกับฟังก์ชัน
addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });