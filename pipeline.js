// class Pipeline {
const Queue = require('./queue')
const queueObj = new Queue();
const stations = [];
stations['dough'] = 0;
stations['toppings'] = 0;
stations['oven'] = 0;
stations['waiter'] = 0;

    function pipeline(data){
        return new Promise(async(resolve, reject) =>  {
            try {
                console.time('pizza pipeline time elapsed')

                let size = Object.keys(data).length;
                for(let i=1; i <= size; i++){
                    if(("table" in data[i]) && ("toppings" in data[i])){
                        await queueObj.enqueue(data[i]);
                    }
                }

                let queueListener = setInterval(async function (){
                    if(queueObj.finished.length !== size){
                        if(!queueObj.isEmpty()) {
                            let order = await queueObj.queueIndex(0);
                            await queueObj.dequeue();
                            switch (order.status) {
                                case 0:
                                    doughChef(order);
                                    break;
                                case 1:
                                    toppingChef(order);
                                    break;
                                case 2:
                                    oven(order);
                                    break;
                                case 3:
                                    waiter(order);
                                    break;
                            }
                        }
                    }
                    else{
                        console.log("finished loop")
                        clearInterval(queueListener);
                        console.timeEnd('pizza pipeline time elapsed');
                        console.log("Orders Report: ");
                        console.log(queueObj.finished);
                        return 1;
                    }
                },500);
            }
            catch (error){
                reject(error);
            }
        });
    }

     function doughChef(order) {
        return new Promise( async (resolve, reject) => {
            try {
                if(stations['dough'] < 2) {
                    if (order.status === 0) {
                        stations['dough']++;
                        order.start = new Date().getTime();
                        let start = new Date().toJSON();
                        setTimeout(async () => {
                            let end = new Date().toJSON();
                            console.log(`dough chef pass - order for table # ${order.table} moving to toppings -`,end);
                            order.status = 1;
                            await queueObj.enqueue(order);
                            stations['dough']--;
                        }, 7000)
                        console.log(`dough chef pass - order for table # ${order.table} in process -`,start);
                    }
                }
                else{
                    await queueObj.enqueue(order);
                }
            }
            catch (error){
                reject(error);
            }
        });
    }

    function toppingChef(order) {
        return new Promise(async (resolve, reject) => {
            try {
                if(stations['toppings'] < 3) {
                    if (order.status === 1) {
                        stations['toppings']++;
                        let toppingRounds = Math.ceil(order['toppings'].length/2);
                        let start = new Date().toJSON();
                        setTimeout(async () => {
                            let end = new Date().toJSON();
                            console.log(`topping chef pass - order for table # ${order.table} moving to oven - `,end);
                            order.status = 2;
                            await queueObj.enqueue(order);
                            stations['toppings']--;
                        }, 4000*toppingRounds)
                        console.log(`topping chef pass - order for table # ${order.table} in process - `,start);
                    }
                }
                else{
                    await queueObj.enqueue(order);
                }
            }
            catch (error){
                reject(error);
            }
        });
    }

    function oven(order) {
        return new Promise(async (resolve, reject) => {
            try {
                if(stations['oven'] < 1) {
                    if (order.status === 2) {
                        stations['oven']++;
                        let start = new Date().toJSON();
                        setTimeout(async () => {
                            let end = new Date().toJSON();
                            console.log(`oven pass - order for table # ${order.table} is ready - `,end);
                            order.status = 3;
                            await queueObj.enqueue(order);
                            stations['oven']--;
                        }, 10000)
                        console.log(`oven pass - order for table # ${order.table} in process - `,start);
                    }
                }
                else{
                    await queueObj.enqueue(order);
                }
            }
            catch (error){
                reject(error);
            }
        });
    }

    function waiter(order) {
        return new Promise(async (resolve, reject) => {
            try {
                if(stations['waiter'] < 2) {
                    if (order.status === 3) {
                        stations['waiter']++;
                        let start = new Date().toJSON();
                        setTimeout(async () => {
                            let end = new Date().toJSON();
                            console.log(`waiter - order for table # ${order.table} is at the table! - `,end);
                            order.status = 4;
                            order.end = new Date().getTime();
                            order.totalPrepTimeInSec = ((order.end-order.start)/1000);
                            await queueObj.addToFinished(order);
                            stations['waiter']--;
                        }, 5000)
                        console.log(`waiter - order for table # ${order.table} on it's way - `,start);
                    }
                }
                else{
                    await queueObj.enqueue(order);
                }
            }
            catch (error){
                reject(error);
            }
        });
    }
    // const toppingChef = async () => {
    //     return new Promise.resolve(true);
    // }
    //
    // const oven = async () => {
    //     return new Promise.resolve(true);
    // }
// }

module.exports = {pipeline, doughChef};