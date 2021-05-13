import { Counter } from '../models/auto-inc-counter';

export const getValueForNextSequence = async (sequenceOfName: string) => {
    try{
        const sequenceDoc = await Counter.findOneAndUpdate({_id: sequenceOfName }, { $inc: { sequence_value: Number(1) }})
        if(sequenceDoc){
            return sequenceDoc.sequence_value;
        }
        return Number(1);
    } catch (ex) {
        throw ex;
    }
}