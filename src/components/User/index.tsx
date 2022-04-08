import { Container, Email, Name, Photo } from "./styles";

export type UserProps = {
    email: string;
    name: string;
    picture: string;
}

type Props = {
    user: UserProps;
}

export function User({ user } : Props) {
    return(
        <Container>
            <Photo
                source={{ uri: user.picture}}
            />

            <Name>{user.name}</Name>

            <Email>{user.email}</Email>
        </Container>
    )
}
