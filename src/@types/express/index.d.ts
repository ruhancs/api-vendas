// informar em tsconfig.json que esta pasta tambem sera utilizada para gerar tipos
// descomentar "typeRoots": [] e inserir     
// "typeRoots": [
//       "@types",
//       "./node_modules/@types"
//     ],  


// para alterar o tipo Request do express e inserir o user
declare namespace Express {
    export interface Request {
        user: {
            id:string;
        };
    }
}