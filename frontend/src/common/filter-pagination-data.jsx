// import axios from "axios"

// export const filterPaginationData =async ({create_new_array=false, state, data, page, countRoute, data_to_send={ },user=undefined}) => {
//    let obj;
//    let headers={};

//    if(user){
//       headers.headers={
//          'Authorization': `Bearer ${user}`
//       }
//    }

//    if(state!=null && !create_new_array){
//     obj={...state, results: [...state.results,...data], page:page}
//    }
//    else{

//      await axios.post(import.meta.env.VITE_SERVER_DOMAIN + countRoute, data_to_send,headers)
//      .then(({data: {totalDocs}})=>{
//          obj = {results:data, page:1,totalDocs}
//      })
//      .catch(err=>{
//         console.log(err);
//      })
//    }

//    return obj;
// }

import axios from "axios";

export const filterPaginationData = async ({ create_new_array = false, state = null, data, page, countRoute, data_to_send = {}, user = undefined }) => {
    let obj;

    let headers = {};

    if (user) {
        headers.headers = {
            'Authorization': `Bearer ${user}`
        };
    }

    if (state !== null && !create_new_array) {
        obj = { ...state, results: [...state.results, ...data], page: page };
    } else {
        try {
            // console.log("Request URL:", `${import.meta.env.VITE_SERVER_DOMAIN}/${countRoute}`);

            const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN+countRoute, data_to_send, { headers :
                {
                'Authorization': `Bearer ${user}`
            }
         });
            // console.log("Server response:", response.data);
            const { data: { totalDocs } } = response;
            obj = { results: data, page: 1, totalDocs };
        } catch (error) {
            console.error("Error fetching totalDocs:", error);
            // Handle the error appropriately, e.g., set default values or display an error message
            obj = { results: data, page: 1, totalDocs: 0 }; // Setting default values in case of an error
        }
    }

    // console.log("Final obj:", obj); // Log the final obj

    return obj;
};
