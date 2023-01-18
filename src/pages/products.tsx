import { useGetProducts } from '@/services/products';
import { Table } from '@mantine/core';

export default function ProductPage() {
  const { data } = useGetProducts();

  return (
    <div>
      <h1 className='text-2xl font-bold'>Products</h1>

      <hr />

      <div className='table-container bg-white'>
        <Table striped withBorder highlightOnHover withColumnBorders fontSize='md' horizontalSpacing='md'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {data?.products.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.brand}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.category}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
