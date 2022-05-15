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


export const convertToJson = (data) => {
  const input_list= data.split("\n").filter(item => item.length > 4).map(item => item.split("\t"));
  // input_list.forEach(item => item.shift())
  const props = input_list.shift();
  const formated = []
  console.log({input_list, props})
  input_list.forEach(row => {
    const tmp = {}
    row.forEach((col, index) => {
      tmp[props[index]] = col == "null" ? null : col;
    })
    formated.push(tmp)
  })
  console.log(formated);
  return formated;

}

export const processFile = (e, data, inputFileId) => {
  console.log(e);
  const input = document.querySelector(data);
  const inputFile = document.querySelector(inputFileId);
  const file = inputFile.files[0];
  console.log(inputFile, file)
    if (!file) return;
    const reader = new FileReader();
      reader.onload = (e) => {
        // e.target points to the reader
        const textContent = e.target.result;
        let temp = textContent.split("\n");
        let arr = [];
        temp.forEach((item) => {
          arr.push(item.split(",").map((i) => i.replaceAll('"', "")));
        });
        let formatted = "";
        arr.forEach((item) => {
          if (item[0] == "") return;
          item.forEach((i) => {
            formatted += `${i}\t`;
          });
          formatted += `\t\n`;
        });
        input.value = formatted;
      };
      reader.onerror = (e) => {
        const error = e.target.error;
        console.error(`Error occured while reading ${file.name}`, error);
      };
      reader.readAsText(file);
}

export const returnValue = (list, key, value, prop) => {
  // Take the parent object's key comparre with the value, if true, return the prop
  console.log(value);
  return list.find(item => item[key] == value)[prop];
}


export const exportCodes= () => {
  const ele = document.createElement("a");
  let items = data.code_list;
  let d = convertToCSV([[...Object.getOwnPropertyNames(data.code_list[0])], ...items]);
  const file = new Blob([d], {type:"text/csv"});
  ele.href = URL.createObjectURL(file);
  ele.download = `${new Date().toISOString()}-all-codes.csv`
  document.body.appendChild(ele);
  ele.click()
}

export const exportItems = () => {
  const ele = document.createElement("a");
  const items = data.items.map(item => ({...item, location: returnValue(data.locations, "id", item.location_id, "short_code")}))
  let d = convertToCSV([[...Object.getOwnPropertyNames(data.items[0]), "location"], ...items]);

  const file = new Blob([d], {type:"text/csv"});
  ele.href = URL.createObjectURL(file);
  ele.download = `${new Date().toISOString()}-all-items.csv`
  document.body.appendChild(ele);
  ele.click()
}