
const BASE_URL = 'https://fresh-hive-backend.onrender.com/api';

async function reproduce() {
    try {
        // 1. Register User
        const email = `testorder${Date.now()}@example.com`;
        const password = 'password123';
        console.log(`Registering user: ${email}`);
        
        const regRes = await fetch(`${BASE_URL}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test User', email, password })
        });
        
        const regData = await regRes.json();
        if (!regData.success) {
            console.error('Registration failed:', regData);
            return;
        }
        
        const token = regData.token;
        console.log('Got token:', token);

        // 2. Get a product
        console.log('Fetching products...');
        const prodRes = await fetch(`${BASE_URL}/items`);
        const products = await prodRes.json();
        
        if (!products || products.length === 0) {
            console.error('No products found');
            return;
        }
        
        const product = products[0];
        const productId = product._id;
        console.log('Using product:', product.name, productId);

        // 3. Place Order
        console.log('Placing order...');
        
        const orderPayload = {
            customer: {
                name: 'Test User',
                email: email,
                phone: '1234567890',
                address: '123 Test St',
                paymentMethod: 'COD',
                notes: 'Test notes inside customer'
            },
            items: [
                {
                    id: productId,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    imageUrl: product.image // Note: product model might have image, orderItemSchema expects imageUrl
                }
            ],
            paymentMethod: 'Cash on Delivery',
            notes: 'Test notes top level',
            deliveryDate: new Date().toISOString()
        };

        const orderRes = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderPayload)
        });

        console.log('Order status:', orderRes.status);
        const orderText = await orderRes.text();
        console.log('Order response:', orderText);

    } catch (err) {
        console.error('Error:', err);
    }
}

reproduce();
