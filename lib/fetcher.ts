import useSWR from "swr";

export const fetcher = (url: RequestInfo, data = undefined) =>
  fetch(
    String(url).indexOf("http") == -1 ? window.location.origin + url : url,
    {
      method: data ? "POST" : "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((r) => r.json());

export const getFetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export const getData = (url: string) => {
  const { data, error } = useSWR(url, getFetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useAdmin = () => {
  return getData("/api/admin");
};

export const useInventory = () => {
  return getData("/api/inventory");
};

export const usePurchase = () => {
  return getData("/api/purchase");
};

export const useFinance = () => {
  return getData("/api/finance");
};

export const useDepartmentHead = () => {
  return getData("/api/departmentHead");
};

export const useCustomer = () => {
  return getData("/api/customer");
};

export const useInfo = () => {
  return getData("/api/info");
};

export const useLog = () => {
  return getData("/api/log");
};





export const getFieldsValues = (event, fields) => {
  
  const data = {};
  fields.forEach((item) => {
    let key = `[name=${item}]`;
    const ele = event.target.querySelector(key);
    
    if (ele.value !== undefined)  {
      data[item] = ele.value;
    } else {
      data[item] = "";
    }
  });
  return data;
};

export const createLog = (model, message, operation) => {
    fetcher("/api/common/log", { model, message, operation }).then((d) => {
      
    })
  }

 
export const checkDepreciation = (item) => {
let od = new Date(item.order_date);
  let dp;
  let today = new Date();
  if (!item.isAsset) {
    return "Not Applicable"
  }
  if (item.depreciation) {
    dp = new Date(item.depreciation)
  } else {
    dp = new Date();
    dp.setFullYear(od.getFullYear() + 10)
  }
  if (dp < today) {
    return "Depreciated"
  } else {
    return dp.toDateString();
  }

}

export const convertToCSV = (objArray) => {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}
