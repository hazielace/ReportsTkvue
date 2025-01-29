<template>
    <header class="header">
        <div class="logo-container">
            <img src="../../../public/logo-tkambio.png" alt="" class="logo" />
        </div>
        <button @click="Logout" class="logout-button">Salir</button>
    </header>

    <div class="container">
        <main>
            <h1 class="title">Generador de reportes TK</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-left">Título</th>
                        <th class="text-center">Fecha de Creación</th>
                        <th class="text-right">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(reporte, index) in reportes" :key="index"  v-if="showResultado">
                        <td class="text-left">{{ reporte.title }}</td>
                        <td class="text-center">{{ reporte.f_created_at }}</td>
                        <td class="text-right">
                            <span @click="downloadReport(reporte.id, reporte.title)" class="download-link">
                                Descargar
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-download">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5v-13m0 13l3.75-3.75m-7.5 0L12 16.5M20.25 19.5H3.75" />
                                </svg>
                            </span>
                        </td>
                    </tr>
                    <tr v-else>
                        <td colspan="3" class="text-center">Sin resultados</td>
                    </tr>
                </tbody>
            </table>
            <button @click="openModal" class="add-button">Crear reporte</button>
        </main>

        <div v-if="modalVisible" class="modal-overlay">
            <div class="modal">
                <button @click="closeModal" class="close-modal">&times;</button>
                <h2 class="text-center">Reporte por fecha de nacimiento</h2>
                <p class="text-center">Ingresa los siguientes datos para generar tu reporte</p>
                <form @submit.prevent="addReport" class="form-add">
                    <div class="form-group">
                        <label for="title">Descripción del reporte</label>
                        <input type="text" id="title" v-model="title" placeholder="Título del reporte"required/>
                    </div>
                    <div class="form-group">
                        <label class="text-center">Fecha de nacimiento</label>
                        <div class="date-fields">
                            <div class="date-column">
                                <div class="form-group">
                                    <label for="startdate">Inicio</label>
                                    <input type="date" id="startdate" v-model="startdate" required />
                                </div>
                            </div>
                            <div class="date-column">
                                <div class="form-group">
                                    <label for="enddate">Fin</label>
                                    <input type="date" id="enddate" v-model="enddate" required />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="add-button" :disabled="!isFormValid">Generar Reporte</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reportes: [
                { id: 1, title: "Reporte de usuario 1", f_created_at: "29/01/2025" },
                { id: 2, title: "Reporte de usuario 2", f_created_at: "29/01/2025" },
                { id: 3, title: "Reporte de usuario 3", f_created_at: "29/01/2025" },
                { id: 4, title: "Reporte de usuario 4", f_created_at: "29/01/2025" },
            ],
            error: null,
            title: '',
            startdate: '',
            enddate: '',
            showResultado: true,
            modalVisible: false,
        };
    },
    computed: {
        isFormValid() {
            return this.title.trim() !== '' && this.startdate !== '' && this.enddate !== '';
        }
    },
    methods: {
        addReport() {
            if (!this.isFormValid) return;
            const newReport = {
                id: this.reportes.length + 1,
                title: this.title,
                f_created_at: new Date().toISOString().split('T')[0],
            };
            this.reportes.push(newReport);
            this.title = '';
            this.startdate = '';
            this.enddate = '';
            this.closeModal();
        },

        downloadReport(id, title) {
            const archivo = title + ".xlsx";
            const blob = new Blob([new ArrayBuffer(0)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = archivo;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        },

        Logout() {
            localStorage.clear();
            this.$router.push('/');
        },

        openModal() {
            this.modalVisible = true;
        },

        closeModal() {
            this.modalVisible = false;
        },
    },
};
</script>

<style lang="scss">
$warning-color: #FFBE12;
$hover-color: #e6a800;
$background-color: #f9f9f9;
$danger-color: #d10000;
$dark-color: #000000;

body {
  font-family: Arial, sans-serif;
  background-color: $background-color;
  margin: 0;
  padding: 0;
}
.container {
    font-family: Arial, sans-serif;
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: linear-gradient(to bottom, #02ADF1, #4563E6);
    position: relative;
}

.header .logo-container {
    flex: 1;
    display: flex;
    justify-content: center;
}

.logo {
    height: 50px;
}

.logout-button {
    background: $danger-color;
    color: $background-color;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.title {
    margin: 20px 0;
    font-size: 1.5rem;
    color: #333;
    text-align: center;
}

.add-button {
    display: block;
    margin: 20px auto;
    background-color: $warning-color;
    color: $dark-color;
    border: none;
    padding: 15px 30px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 50px;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: $hover-color;
    }
}

.table {
    width: 70%;
    margin: 20px auto;
    border-collapse: collapse;
    background: #4563E6;
    color: #fff;
    border: 3px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.table th {
    padding: 15px 30px;
    background-color: #4563E6;
    font-weight: bold;
    border-bottom: 4px solid #C4C4C4;
}

.table td {
    padding: 15px 30px;
    border-bottom: 1px solid #C4C4C4;
    border-right: 4px solid #C4C4C4;
}

.table th:last-child,
.table td:last-child {
    border-right: none;
}

.text-center {
    text-align: center;
}

.text-right {
    text-align: right;
}

.text-left {
    text-align: left;
}

.download-link {
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    text-decoration: none;
}

.icon-download {
    height: 20px;
    width: 20px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background: $background-color;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 400px;
}

.close-modal {
    background: none;
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
}

.form-add {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-add label {
    text-align: left;
    font-weight: bold;
}

.form-add input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}

.date-fields {
    display: flex;
    gap: 10px;
}

.date-column {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.add-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>