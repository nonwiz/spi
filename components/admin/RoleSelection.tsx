export default function RoleSelection() {

    return (
   
        <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
                <select className="form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="Role selection">
                    <option selected>Admin</option>
                    <option value="Customer">Customer</option>
                    <option value="Finance Officer">Finance Officer</option>
                    <option value="Inventory Officer">Inventory Officer</option>
                    <option value="Purchasing Officer">Purchasing Officer</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            </div>



    )
}