const fs = require('fs');
const csv = require('csv-parse/sync');

(async () => {
  // Read CSV files
  const customersCsv = fs.readFileSync('customers.csv', 'utf8');
  const productsCsv = fs.readFileSync('products.csv', 'utf8');
  const ordersCsv = fs.readFileSync('orders.csv', 'utf8');

  // Parse CSV data
  const customersData = csv.parse(customersCsv, { columns: true });
  const productsData = csv.parse(productsCsv, { columns: true });
  const ordersData = csv.parse(ordersCsv, { columns: true });

  // Create a map of product IDs to costs
  const productCosts = new Map();
  productsData.forEach((product) => {
    productCosts.set(parseInt(product.id), parseFloat(product.cost));
  });

  // Calculate total euros spent by each customer
  const customerTotals = new Map();

  // Ensure all customers are included, even those with no orders
  customersData.forEach((customer) => customerTotals.set(customer.id, 0));
   
  ordersData.forEach((order) => {
    const customerId = order.customer;
    const productIds = order.products.split(' ').map(Number);
    const totalEuros = productIds.reduce((acc, productId) => {
      return acc + (productCosts.get(productId) || 0);
    }, 0);
    customerTotals.set(customerId, (customerTotals.get(customerId) || 0) + totalEuros);
  });

  // Create an array of customer ranking data
  const customerRanking = Array.from(customerTotals.entries()).map(([customerId, totalEuros]) => {
    const customer = customersData.find((c) => c.id === customerId);
    return {
      id: customerId,
      firstname: customer.firstname,
      lastname: customer.lastname,
      total_euros: totalEuros,
    };
  });

  // Sort by total euros in descending order
  customerRanking.sort((a, b) => b.total_euros - a.total_euros);

  // Create CSV content
  const csvContent = 'id,firstname,lastname,total_euros\n' +
    customerRanking.map((customer) => `${customer.id},${customer.firstname},${customer.lastname},${customer.total_euros}`).join('\n');

  // Save to customer_ranking.csv
  fs.writeFileSync('customer_ranking.csv', csvContent, 'utf8');
})();

