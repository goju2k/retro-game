import GlobalVar from "@/modules/base/GlobalVar";
class ObjectFunc{

    $getObject = function(){
        return GlobalVar;
    }

    $setObject = function(s){
        this.$getObject();
        return GlobalVar;
    }

};
export default new ObjectFunc();