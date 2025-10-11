import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}



export async function GET() {
 
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}

async function listCustomers() {
	const data = await sql`
    SELECT CUSTOMERS.NAME, CUSTOMERS.EMAIL, CUSTOMERS.DATE, CUSTOMERS.STATUS
    FROM CUSTOMERS;
  `;

	return data;
}


export async function GETcustomers() {
 
  try {
  	return Response.json(await listCustomers());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}