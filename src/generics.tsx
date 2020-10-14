interface IGen {
  length: number
}
export const func: <T extends IGen>(arg: T) => T
  = (arg) => {
    console.log(arg.length)
    return arg;
  };

const result = func([111, 111]);
