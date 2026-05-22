import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async (key:string)=>{
    const value = await AsyncStorage.getItem(key)
    if(value !== null){
        try{
            return JSON.parse(value);
        }
        catch(e:any){
            console.log(e);
            return null;
        }
    }
    return null;
}

const setItem = async(key:string,value:any)=>{
    try{
        await AsyncStorage.setItem(key,JSON.stringify(value))
    }
    catch(e:any){
        console.log(e);
    }
}

const removeItem = async(key:string)=>{
    try{
        await AsyncStorage.removeItem(key)
    }
    catch(e:any){
        console.log(e);
    }
}

export {
    getItem,
    setItem,
    removeItem
}
