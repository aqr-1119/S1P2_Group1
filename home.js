// 获取 DOM 元素
const calendarBody = document.getElementById('calendar-body');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const timeSlotsContainer = document.getElementById('time-slots-container'); // 确保有此ID
const amPmSelector = document.getElementById('am-pm-selector');
const timeSlots = document.getElementById('time-slots');
const bookAppointmentBtn = document.getElementById('book-appointment');
const termsContainer = document.getElementById('terms-container');
const checkbox1 = document.getElementById('terms-checkbox1');
const checkbox2 = document.getElementById('terms-checkbox2');

// 当前日期信息
let currentDate = new Date();

// 渲染日历
function renderCalendar(date) {
  calendarBody.innerHTML = '';
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  monthYear.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

  let day = firstDay.getDay();
  let dateNumber = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < day) {
        cell.textContent = '';
      } else if (dateNumber > lastDay.getDate()) {
        cell.textContent = '';
      } else {
        cell.textContent = dateNumber;
        cell.classList.add('date-cell');
        dateNumber++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}

// 切换月份
prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// 点击日历日期事件
calendarBody.addEventListener('click', (event) => {
  if (event.target.classList.contains('date-cell') && event.target.textContent !== '') {
    const selectedDay = event.target.textContent;
    const selectedMonth = currentDate.getMonth() + 1;
    const selectedYear = currentDate.getFullYear();
    const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    // 确保 selectedDateHeading 在你的 HTML 中存在
    let selectedDateHeading = document.getElementById('selected-date'); // 这里假设你有这个元素
    selectedDateHeading.textContent = `Available Appointments for: ${selectedDate}`;

    renderTimeSlots(selectedDate);
    timeSlotsContainer.style.display = 'block';
    termsContainer.style.display = 'block';
  }
});

// 渲染时间段
function renderTimeSlots(selectedDate) {
  timeSlots.innerHTML = '';
  const isAmSelected = amPmSelector.value === 'AM';
  const startHour = isAmSelected ? 0 : 12;
  const endHour = isAmSelected ? 12 : 24;

  for (let hour = startHour; hour < endHour; hour++) {
    const timeSlot = document.createElement('li');
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const suffix = isAmSelected ? 'AM' : 'PM';
    timeSlot.textContent = `${displayHour}:00 ${suffix}`;
    timeSlot.classList.add('time-slot');

    timeSlot.addEventListener('click', () => {
      document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
      timeSlot.classList.add('selected');
    });

    timeSlots.appendChild(timeSlot);
  }
}

// AM/PM选择器变化
amPmSelector.addEventListener('change', () => {
  renderTimeSlots();
});

// 勾选框变化和预约按钮启用
function toggleBookButton() {
  bookAppointmentBtn.disabled = !(checkbox1.checked && checkbox2.checked);
  bookAppointmentBtn.classList.toggle('enabled', checkbox1.checked && checkbox2.checked);
}

checkbox1.addEventListener('change', toggleBookButton);
checkbox2.addEventListener('change', toggleBookButton);

// 提交预约
bookAppointmentBtn.addEventListener('click', () => {
  if (!bookAppointmentBtn.disabled) {
    const selectedTime = document.querySelector('.time-slot.selected');
    if (selectedTime) {
      alert(`Your appointment on ${selectedDateHeading.textContent} at ${selectedTime.textContent} has been booked successfully.`);
      document.location.reload(); // 刷新页面
    } else {
      alert('Please select a time slot before booking.');
    }
  }
});

// 首次页面加载渲染日历
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar(currentDate);
});

calendarBody.addEventListener('click', (event) => {
  if (event.target.classList.contains('date-cell') && event.target.textContent !== '') {
      // 清除所有其他选中状态
      document.querySelectorAll('.date-cell').forEach(cell => cell.classList.remove('selected'));
      
      // 设置当前点击的日期为选中状态
      event.target.classList.add('selected');

      // 获取选中的日期信息
      const selectedDay = event.target.textContent;
      const selectedMonth = currentDate.getMonth() + 1;
      const selectedYear = currentDate.getFullYear();
      const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

      // 更新选中日期标题
      const selectedDateHeading = document.getElementById('selected-date');
      selectedDateHeading.textContent = `Available Appointments for: ${selectedDate}`;
      
      // 显示时间段
      renderTimeSlots(selectedDate);
      timeSlotsContainer.style.display = 'block';
      termsContainer.style.display = 'block';
  }
});

bookAppointmentBtn.addEventListener('click', () => {
  if (!bookAppointmentBtn.disabled) {
      const selectedTime = document.querySelector('.time-slot.selected').textContent;
      const selectedDate = document.getElementById('selected-date').textContent;

      alert(`Your appointment on ${selectedDate} at ${selectedTime} has been booked successfully.`);
      location.reload(); // 刷新页面
  } else {
      alert('Please complete all steps before booking.');
  }
});

document.getElementById('book-appointment').addEventListener('click', () => {
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const dob = document.getElementById('dob').value.trim();
  const idUpload = document.getElementById('id-upload').files[0];
  const selectedTime = document.querySelector('.time-slot.selected');

  if (!firstName || !lastName || !dob || !idUpload) {
      alert('Please complete all form fields and upload your ID.');
      return;
  }

  if (!selectedTime) {
      alert('Please select a time slot.');
      return;
  }

  const selectedDate = document.getElementById('selected-date').textContent;
  alert(`Your appointment on ${selectedDate} at ${selectedTime.textContent} has been booked successfully.`);
  location.reload(); // 刷新页面
});

// 表单校验函数
function validateForm() {
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const dob = document.getElementById('dob').value;
  const idUpload = document.getElementById('id-upload').files.length;
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();

  return (
      firstName && lastName && dob && idUpload > 0 &&
      phone && email &&
      document.querySelector('.time-slot.selected') && 
      checkbox1.checked && checkbox2.checked
  );
}

// 提交按钮逻辑
bookAppointmentBtn.addEventListener('click', () => {
  if (validateForm()) {
      alert('Your appointment has been successfully booked!');
      location.reload();
  } else {
      alert('Please fill in all required fields.');
  }
});