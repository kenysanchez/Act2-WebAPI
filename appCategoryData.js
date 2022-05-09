var app = Vue.createApp({
    data() {
        return {
            userName: '',
            userType: '',
            customerId: '',
            urlBase: 'http://localhost:3000',
            Title: 'Create Category',
            category: {
                id_category: null,
                id_parent: '',
                id_shop_default: '',
                level_depth: '',
                active: '',
                date_add: '',
                date_upd: ''
            }
        }
    },
    methods:{
        getParameters(){
            const params = new URLSearchParams(window.location.search);
            if(params.has('id_category')){
                this.customerId = params.get('id_category');
                this.Title = 'Edit Item';
                this.getCustomer();
            }
                
        },
        async getCustomer(){
            const customerData = await this.CallApi(this.urlBase + '/customer/' + this.customerId, 'GET', null);
            this.customer.Id = customerData[0].Id;
            this.customer.Name = customerData[0].Name;
            this.customer.Phone = customerData[0].Phone;
            this.customer.Address = customerData[0].Address;
            this.customer.Email = customerData[0].Email;
            this.customer.DateOfBirth = customerData[0].DateOfBirth;
        },
        async CallApi(url, method, data){
            const header = data == null? { 	method: method,
                                            headers: { 'Content-Type': 'application/json' }} :
                                         { 	method: method,
                                            body: JSON.stringify(data),
                                            headers: { 'Content-Type': 'application/json' }}
    
            try {
                const response = await fetch(url, header);
                return await response.json();
            }
            catch(error){
                alert('Hubo un error favor de contactar al admnistrador.');
            }
        },
        cancel(){
            window.location.href = 'customer.html';
        },
        async save(){
            const data = { 
                'id': this.customer.Id,
                'name': this.customer.Name, 
                'phone': this.customer.Phone, 
                'address': this.customer.Address,
                'email': this.customer.Email,
                'dateOfBirth': this.customer.DateOfBirth
            };
            const method = this.customerId == ''? 'POST' : 'PUT';

            const result = await this.CallApi(this.urlBase + '/customer', method, data);
            if(result == 'OK'){
                this.customerId == ''? alert('Se inserto registro correctamente') : alert('Se actualizo registro correctamente');
            }
            else{
                alert('Hubo un error, favor de contactar al administrador')
            }

            window.location.href = 'customer.html';
        },
        setSessionData(){
            const sessionData = sessionStorage.getItem('sessionData');
            if(sessionData == null){
                window.location.href = 'login.html';
            }
            else{
                const objSessionData = JSON.parse(sessionData);
                this.userName = objSessionData.userName;
                this.userType = objSessionData.profile;
            }
        }
    },
    mounted(){
        this.setSessionData();
        if(this.userName != '') this.getParameters();
    }
})