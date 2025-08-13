document.addEventListener("DOMContentLoaded", () => {
  const inputEl = document.querySelector("#task-input");
  const listEl = document.querySelector("#task-list");
  const addBtn = document.querySelector("#task-add-btn");
  const toastEl = document.querySelector("#toast");

  const showToast = msg => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove("show"), 1800);
  };

  const save = () => localStorage.setItem("tasksHTML", listEl.innerHTML);

  const ensureDeletes = () => {
    listEl.querySelectorAll("li").forEach(li => {
      if (!li.querySelector(".task-delete")) {
        const del = document.createElement("span");
        del.className = "task-delete";
        del.textContent = "×";
        li.append(del);
      }
    });
  };

  const addTask = () => {
    const value = inputEl.value.trim();
    if (!value) {
      showToast("Type a task first");
      return;
    }
    const li = document.createElement("li");
    li.textContent = value;

    const del = document.createElement("span");
    del.className = "task-delete";
    del.textContent = "×";
    li.append(del);

    listEl.append(li);
    inputEl.value = "";
    save();
  };

  listEl.addEventListener("click", e => {
    if (e.target.classList.contains("task-delete")) {
      e.target.closest("li")?.remove();
      save();
      return;
    }
    const li = e.target.closest("li");
    if (li && listEl.contains(li)) {
      li.classList.toggle("checked");
      save();
    }
  });

  const load = () => {
    listEl.innerHTML = localStorage.getItem("tasksHTML") ?? "";
    ensureDeletes();
  };

  addBtn?.addEventListener("click", addTask);
  inputEl?.addEventListener("keydown", e => {
    if (e.key === "Enter") addTask();
  });

  load();
});
