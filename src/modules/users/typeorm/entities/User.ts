import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude, Expose } from "class-transformer";


@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    @Exclude()//class transformer para excluir a senha do retorno implementada no controller tambem
    password:string;
    
    @Column()
    avatar:string;

    @CreateDateColumn()
    created_at:Date;
    
    @CreateDateColumn()
    updated_at:Date;

    @Expose({name:'avatar_url'})//inserir a url do avatar no retorno
    getAvatarUrl(): string | null {
        if(!this.avatar) {
            return null;
        }
        return `${process.env.APP_API_URL}/files/${this.avatar}`
    }

}

export default User;