


const BASE_URL = 'https://fresh-hive-backend.onrender.com/api';

async function reproduce() {
    try {
        // 1. Register User
        const email = `test${Date.now()}@example.com`;
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
        
        const productId = products[0]._id; // Assuming response is array of products
        console.log('Using product ID:', productId);

        // 3. Add to cart (Valid)
        console.log('Adding to cart (valid)...');
        const cartRes = await fetch(`${BASE_URL}/cart`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        
        if (cartRes.ok) {
             console.log('Add to cart success:', await cartRes.json());
        } else {
             console.log('Add to cart failed:', await cartRes.text());
        }

        // 4. Add same item again
        console.log('Adding same item again...');
        const cartRes2 = await fetch(`${BASE_URL}/cart`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity: 2 })
        });
        console.log('Add same item status:', cartRes2.status);

        // 5. Add item with invalid quantity
        console.log('Adding item with invalid quantity...');
        const cartRes3 = await fetch(`${BASE_URL}/cart`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity: "abc" })
        });
        console.log('Add invalid quantity status:', cartRes3.status);
        console.log('Response:', await cartRes3.text());

        // 6. Add item with invalid productId (not ObjectId)
        console.log('Adding item with invalid productId...');
        const cartRes4 = await fetch(`${BASE_URL}/cart`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId: "invalid-id", quantity: 1 })
        });
        console.log('Add invalid productId status:', cartRes4.status);
        console.log('Response:', await cartRes4.text());

        // 7. Remove item by decreasing quantity
        console.log('Decreasing quantity to remove item...');
        // Quantity is 1 (step 3) + 2 (step 4) = 3.
        // Add -3 to make it 0
        const cartRes5 = await fetch(`${BASE_URL}/cart`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity: -3 })
        });
        console.log('Decrease quantity status:', cartRes5.status);
        console.log('Response:', await cartRes5.text());

    } catch (err) {
        console.error('Error:', err);
    }
}

reproduce();
