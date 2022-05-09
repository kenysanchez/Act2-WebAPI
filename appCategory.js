var app = Vue.createApp({
    data() {
        return {
            category: [],
            categoryCmb: [],
            categoryId: '',
            urlBase: 'http://localhost:3000'
        }
    },
    methods:{
        async getCategory(){
            var Id = this.id_category != ''? '/' + this.id_category : this.id_category;
            this.category = await this.CallApi(this.urlBase + '/read' + Id, 'GET', null);
            this.id_category = '';
        },
        async CallApi(url, method, data){
            const header = data == null? { 	method: method,
                                            headers: { 'Content-Type': 'app/json' }} :
                                         { 	method: method,
                                            body: JSON.stringify(data),
                                            headers: { 'Content-Type': 'app/json' }}
    
            try {
                const response = await fetch(url, header);
                return await response.json();
            }
            catch(error){
                alert('Hubo un error favor de contactar al admnistrador.');
            }
        },
        categoryData(Id){
            Id = Id != ''? '?Id=' + Id : Id;
            window.location.href = 'categorydata.html' + Id;
        },
        async Deletecategory(Id){
            const result = await this.CallApi(this.urlBase + '/remove/' + Id, 'DELETE', null)
            
		    if(result == 'OK'){
                this.getcategory();
                alert('Se elimino registro correctamente')
            }
            else{
                alert('Hubo un error, favor de contactar al administrador.');
            }
        },
        
    },
    computed:{
        totalCategories(){
            return this.category.length;
        }
    }

})