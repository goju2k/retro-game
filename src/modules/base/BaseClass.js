import Math from "@/modules/util/math";
import GlobalVar from "@/modules/base/GlobalVar";
import ObjectContext from "@/modules/base/ObjectContext";

class BaseClass{

    constructor(){

        this.$math = Math;
        this.$g = GlobalVar;

        Object.assign(this, ObjectContext);

    }

}

export default BaseClass;