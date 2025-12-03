const API_URL = 'https://jsonplaceholder.typicode.com/users';
        const tableBody = document.getElementById('tableBody');
        const loadingDiv = document.getElementById('loading');
        const usersTable = document.getElementById('usersTable');
        const statusDiv = document.getElementById('status');

        async function fetchUsers() {
            try {
                const response = await fetch(API_URL);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const users = await response.json();

                renderTable(users);
                
                showTable();
                statusDiv.innerHTML = "Sistema Online";

            } catch (error) {
                console.error("Hubo un problema al obtener los usuarios:", error);
                loadingDiv.textContent = "Error al cargar los datos. Por favor revise su conexión.";
                loadingDiv.style.color = "red";
                statusDiv.innerHTML = "Error de Conexión";
                statusDiv.style.color = "red";
            }
        }

        function renderTable(users) {
            tableBody.innerHTML = '';

            users.forEach(user => {
                const row = document.createElement('tr');

                const initials = user.name.split(' ').map(n => n[0]).join('').substring(0,2);

                row.innerHTML = `
                    <td>
                        <div class="user-avatar">
                            <div class="avatar-circle">${initials}</div>
                            ${user.name}
                        </div>
                    </td>
                    <td>@${user.username}</td>
                    <td><a href="mailto:${user.email}" style="color: inherit; text-decoration: none;">${user.email}</a></td>
                    <td>${user.phone}</td>
                    <td>${user.company.name}</td>
                    <td>${user.address.city}</td>
                `;

                tableBody.appendChild(row);
            });
        }

        function showTable() {
            loadingDiv.style.display = 'none';
            usersTable.style.display = 'table';
            usersTable.style.animation = 'fadeIn 0.5s';
        }

        // 5. Iniciar

        document.addEventListener('DOMContentLoaded', fetchUsers);
