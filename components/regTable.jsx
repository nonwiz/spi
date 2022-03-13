import RegItem from "@/components/regItem";
const ReqTable = () => {
  return (
    <>
      <div className="">
        <div className=" hidden lg:grid lg:grid-cols-6 ">
          <p class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
            Name
          </p>
          <p class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:block">
            Department
          </p>
          <p class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">
            Request
          </p>
          <p class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </p>

          <div className="flex gap-2 justify-center items-center  ">
            {/* the elipsis */}
            <div className="bg-black h-1 w-1 rounded-full"></div>
            <div className="bg-black h-1 w-1 rounded-full"></div>
            <div className="bg-black h-1 w-1 rounded-full"></div>
          </div>
        </div>
        <div></div>
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 grid grid-auto-rows-5 lg:grid-cols-6 ">
        <RegItem
          name="Dan Khazifire"
          email="khazifire@test.com"
          department="Information Technology"
          requestDescription="Computer Lab monitor for IT Department and also a cool keybaord"
          requestStatus="Pending"
          requestId="IT100"
        />
        <RegItem
          name="Dan Khazifire"
          email="khazifire@test.com"
          department="Information Technology"
          requestDescription="Computer Lab monitor for IT Department and also a cool keybaord"
          requestStatus="Pending"
          requestId="IT100"
        />
        <RegItem
          name="Dan Khazifire"
          email="khazifire@test.com"
          department="Information Technology"
          requestDescription="Computer Lab monitor for IT Department and also a cool keybaord"
          requestStatus="Pending"
          requestId="IT100"
        />

        <RegItem
          name="Dan Khazifire"
          email="khazifire@test.com"
          department="Information Technology"
          requestDescription="Computer Lab monitor for IT Department and also a cool keybaord"
          requestStatus="Pending"
          requestId="IT100"
        />
        <RegItem
          name="Dan Khazifire"
          email="khazifire@test.com"
          department="Information Technology"
          requestDescription="Computer Lab monitor for IT Department and also a cool keybaord"
          requestStatus="Pending"
          requestId="IT100"
        />
        <RegItem
          name="Dan Khazifire"
          email="khazifire@test.com"
          department="Information Technology"
          requestDescription="Computer Lab monitor for IT Department and also a cool keybaord"
          requestStatus="Pending"
          requestId="IT100"
        />
        <RegItem
          name="Dan Khazifire"
          email="khazifire@test.com"
          department="Information Technology"
          requestDescription="Computer Lab monitor for IT Department and also a cool keybaord"
          requestStatus="Pending"
          requestId="IT100"
        />
        <RegItem
          name="Dan Khazifire"
          email="khazifire@test.com"
          department="Information Technology"
          requestDescription="Computer Lab monitor for IT Department and also a cool keybaord"
          requestStatus="Pending"
          requestId="IT100"
        />

        <RegItem
          name="Dan Khazifire"
          email="khazifire@test.com"
          department="Information Technology"
          requestDescription="Computer Lab monitor for IT Department and also a cool keybaord"
          requestStatus="Pending"
          requestId="IT100"
        />

        <RegItem
          name="Dan Khazifire"
          email="khazifire@test.com"
          department="Information Technology"
          requestDescription="Computer Lab monitor for IT Department and also a cool keybaord"
          requestStatus="Pending"
          requestId="IT100"
        />
      </div>
    </>
  );
};

export default ReqTable;
