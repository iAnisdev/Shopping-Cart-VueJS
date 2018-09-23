var app = new Vue({
    el : "#app",
    data : {
        showItems: true,
        showCart: false,
       items: [
           {
               name: "NMD_R1 SHOES",
               price: 91,
           },
           {
            name: "ULTRABOOST UNCAGED SHOES",
            price: 126,
        },
        {
            name: "NMD_RACER PRIMEKNIT SHOES",
            price: 90,
        },
        {
            name: "ULTRABOOST CLIMA SHOES",
            price: 200,
        },
        {
            name: "ULTRABOOST UNCAGED SHOES",
            price: 63,
        },
        {
            name: "NMD_C2 SHOES",
            price: 80,
        },
       ],
       isError: false,
       cart: [],
       total: 0,
       codeSuccess : "",
       codeApplied: false,
       payGateway: false,
       codes:[
           {
               code: "trial10",
               info: "10% Off"
           },
           {
            code: "giveme20",
            info: "20% Off"
        },
        {
            code: "quarterTrial",
            info: "25% Off"
        },
        {
            code: "halfhalf",
            info: "50% Off"
        }
       ],
       code: "",
       codeErr: "",
       disCountApplied: true
    },
    methods: {
        viewCart: function(){
            if(this.cart.length == 0){
                alert("Empty cart!  please add something before checkout")
            }else{
                this.showItems = !this.showItems
                this.showCart = !this.showCart
            }
       },
       addToCart: function(item){
        this.cart.push(item)
        this.sumTotal()
       },
       removeItem: function(item){
        if(this.cart.length > 1){
            this.cart.splice(item.index, 1)
            this.sumTotal()
            this.disCountApplied = true
            this.codeApplied=  false
            this.payGateway = false
        }else{
            let empty = confirm("Are You sure to remove this Item");
            if(empty == true){
                this.cart.splice(item.index, 1)
                this.total = 0
            }
            setTimeout(function(){
                alert("Empty cart! , please add something first")
            }, 100)
            this.showItems = !this.showItems
            this.showCart = !this.showCart
            this.codeApplied =  false
            this.code = ""
            this.disCountApplied = true
            this.isError = false
            this.payGateway = false
        }
       },
       sumTotal: function(){
        let prices = []
           this.cart.forEach(item => {
               prices.push(item.price)
               let sum = prices.reduce(add, 0);
               function add(a, b) {
                   return a + b;
               }
               this.total = sum
           });
       },
       applyCoupen: function(total , code){
        code = code.toLowerCase()
        switch (code) {
            case '':
            this.codeErr ="Enter Discount Code",
            this.isError = true
            break;
            case 'trial10':
                this.total = this.total - ((10 / 100) * this.total)
                this.codeSuccess = "10% Discount Applied",
                this.codeApplied=  true
                this.disCountApplied = false
                this.isError = false
                this.code = ""
                this.payGateway = true
                break;
                case 'giveme20':
                this.total = this.total - ((20 / 100) * this.total)
                this.codeSuccess = "20% Discount Applied",
                this.codeApplied=  true
                this.disCountApplied = false
                this.code = ""
                this.isError = false
                this.payGateway = true
                break;
                case 'quartertrial':
                this.total = this.total - ((25 / 100) * this.total)
                this.codeSuccess = "25% Discount Applied",
                this.codeApplied=  true
                this.code = ""
                this.disCountApplied = false
                this.isError = false
                this.payGateway = true
                break;
                case 'halfhalf':
                this.total = this.total - ((50 / 100) * this.total)
                this.codeSuccess = "50% Discount Applied",
                this.codeApplied=  true
                this.code = ""
                this.disCountApplied = false
                this.isError = false
                this.payGateway = true
                break;
                default:
                this.total = this.total
                this.codeErr = "Invalid Discount Code",
                this.code = ""
                this.isError = true
          }
       }
    }
})
