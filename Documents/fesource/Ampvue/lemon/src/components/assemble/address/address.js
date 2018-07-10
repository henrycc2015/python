import { provinces, cities } from 'src/constant/cities';

let address = [];

//foreach provinces
for (let i = 0; i < provinces.length; i++) {
    let item = provinces[i];
    let model = {
        'name': item.value,
        'value': item.key
    }
    address.push(model);
}

//foreach cities
for (let [k, v] of Object.entries(cities)) {
    let parent = k;
    if(Array.isArray(v) && v.length> 0){
        for(let i = 0; i < v.length; i++){
            let [key, value] = Object.entries(v[i])[0];
            let model = {
                parent,
                'name': value,
                'value': key
            }
            address.push(model);
        }
    }
}

console.log(JSON.stringify(address));
export default address;