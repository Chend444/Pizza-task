# pizza
managing pizzaria

Your task is to manage a Pizza restaurant - the restaurant receives an array of orders, while each order is for one Pizza that contains an array of toppings.

The dough-to-pizza pipeline is:
Dough chef ->  Topping chef -> Oven -> Serving
 
When a certain station within the pipeline is completed, the pizza moves to the next one.
There are no dependencies between the orders in the arrays - when an order is ready to be served, it is being deployed to the customer.
 
The restaurant personnels are:
 
2 dough chefs - each chef can handle one dough at a time. It takes 7 seconds to prepare each dough.
3 topping chefs - each chef can handle 2 toppings at a time. It takes 4 seconds to put each topping on the Pizza.
1 oven that takes one pizza each time and cook it for 10 seconds.
2 waiters that serve the pizza to the customers. From the kitchen to the table it takes 5 seconds.
 
Each process should print logs (start and end time).
In the end, when all the orders had been served, you need to print a report about the the  
complete set of orders. The report should contain:
 
The preparation time from start to end
The preparation time for each order

