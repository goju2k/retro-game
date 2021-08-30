import Math from "@/modules/util/math";
import GlobalVar from "@/modules/base/GlobalVar";
import ObjectFunc from "@/modules/base/ObjectFunc";

class BaseClass{

    constructor(){

        this.$math = Math;
        this.$g = GlobalVar;

        Object.assign(this, ObjectFunc);
        
    }

}

export default BaseClass;