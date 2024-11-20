<!-- <template>
    <div>
      <h2>Gerenciar Marcas</h2>
      <v-data-table
        :headers="headers"
        :items="brands"
        item-value="id"
        class="elevation-1"
        dense
      >
        <template #item.actions="{ item }">
          <v-btn color="primary" text @click="openUpdateDialog(item)">Editar</v-btn>
          <v-btn color="error" text @click="deleteBrand(item.id)">Deletar</v-btn>
        </template>
      </v-data-table>
  
      <v-row justify="center" v-if="!loading && !brands.length">
        <p>Nenhuma marca encontrada. Adicione uma nova marca para começar.</p>
      </v-row>
  
      <v-btn color="primary" @click="openCreateDialog">Adicionar Marca</v-btn>
  
      <v-dialog v-model="dialog.open" max-width="500px">
        <v-card>
          <v-card-title>{{ isEditing ? 'Editar Marca' : 'Criar Marca' }}</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="formData.nome"
                label="Nome da Marca"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="saveBrand">Salvar</v-btn>
            <v-btn color="grey" @click="closeDialog">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-snackbar
        v-model="snackbar.visible"
        :color="snackbar.color"
        timeout="3000"
        top
      >
        {{ snackbar.message }}
      </v-snackbar>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        brands: [],
        headers: [
          { text: "ID", value: "id", align: "center" },
          { text: "Nome", value: "nome" },
          { text: "Ações", value: "actions", align: "center" },
        ],
        loading: false,
        dialog: { open: false },
        isEditing: false,
        formData: { id: null, nome: "" },
        snackbar: { visible: false, message: "", color: "success" },
      };
    },
    methods: {
      async fetchBrands() {
        this.loading = true;
        try {
          const response = await axios.get("https://localhost:7250/api/brand");
          this.brands = response.data.$values || [];
        } catch (error) {
          console.error("Erro ao buscar marcas:", error);
          this.showSnackbar("Erro ao buscar marcas.", "error");
        } finally {
          this.loading = false;
        }
      },
      openCreateDialog() {
        this.dialog.open = true;
        this.isEditing = false;
        this.formData = { id: null, nome: "" };
      },
      openUpdateDialog(brand) {
        this.dialog.open = true;
        this.isEditing = true;
        this.formData = { id: brand.id, nome: brand.nome };
      },
      async saveBrand() {
        try {
          if (this.isEditing) {
            await axios.put(
              `https://localhost:7250/api/brand/${this.formData.id}`,
              { nome: this.formData.nome }
            );
            this.showSnackbar("Marca atualizada com sucesso!", "success");
          } else {
            await axios.post("https://localhost:7250/api/brand", {
              nome: this.formData.nome,
            });
            this.showSnackbar("Marca criada com sucesso!", "success");
          }
          this.fetchBrands();
          this.closeDialog();
        } catch (error) {
          console.error("Erro ao salvar marca:", error);
          const errorMessage =
            error.response?.data?.title || "Erro ao salvar marca.";
          this.showSnackbar(errorMessage, "error");
        }
      },
      async deleteBrand(id) {
        try {
          await axios.delete(`https://localhost:7250/api/brand/${id}`);
          this.fetchBrands();
          this.showSnackbar("Marca deletada com sucesso!", "success");
        } catch (error) {
          console.error("Erro ao deletar marca:", error);
          this.showSnackbar("Erro ao deletar marca. Tente novamente.", "error");
        }
      },
      closeDialog() {
        this.dialog.open = false;
      },
      showSnackbar(message, color) {
        this.snackbar.message = message;
        this.snackbar.color = color;
        this.snackbar.visible = true;
      },
    },
    mounted() {
      this.fetchBrands();
    },
  };
  </script>
  
  <style scoped>

  </style>
   -->