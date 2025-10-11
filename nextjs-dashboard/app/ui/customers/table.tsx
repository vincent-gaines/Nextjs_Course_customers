import Image from 'next/image';
import { UpdateCustomer, DeleteCustomer } from '@/app/ui/customers/buttons';
import CustomerStatus from '@/app/ui/customers/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredCustomers } from '@/app/lib/data';

export default async function CustomersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const Customers = await fetchFilteredCustomers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {Customers?.map((Customer) => (
              <div
                key={Customer.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={Customer.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${Customer.name}'s profile picture`}
                      />
                      <p>{Customer.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{Customer.email}</p>
                        <CustomerStatus status={Customer.status} />
                    <p>{formatDateToLocal(Customer.date)}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateCustomer id={Customer.id} />
                    <DeleteCustomer id={Customer.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {Customers?.map((Customer) => (
                <tr
                  key={Customer.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={Customer.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${Customer.name}'s profile picture`}
                      />
                      <p>{Customer.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {Customer.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <CustomerStatus status={Customer.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(Customer.date)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCustomer id={Customer.id} />
                      <DeleteCustomer id={Customer.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
