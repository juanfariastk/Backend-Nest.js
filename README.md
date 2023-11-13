## Project FullStack backend - Web!

Feito com: [Nest](https://github.com/nestjs/nest) 

## Instalação

```bash
$ npm install

//ou

$ yarn install
```

## Rodando o App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

#migrations 
$ npm run migrations

// ou

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# migrations
$ yarn migrations

```

## Guia de Rotas :

***obs***: As rotas de Usuários e de Anuncios precisaram do token referente ao usuário para alterações e remoções. Para conseguir o token vá para a rota de Login e faça a autenticação para pegar o seu token!

## Usuários

### POST /users

- **Descrição**: Cria um novo usuário.
- **Como acessar**: Faça uma requisição POST para /users com os dados do novo usuário no corpo da requisição.

**Envio**:
```
{
  "name": "João da Silva",
  "email": "joao.silva@example.com",
  "phone": "555-123-4567",
  "birthday": "1990-05-15",
  "description": "Sou um usuário fictício.",
  "user_type": "anunciante",
  "password": "senha1234561",
  "cpf": "123.456.789-00",
  "user_image": "caminho/para/imagem.jpg"
}
```
**Retorno**:
```
Status Code:201
{
	"id": 1,
	"name": "João da Silva",
	"email": "joao.silva@example.com",
	"phone": "555-123-4567",
	"birthday": "1990-05-15",
	"description": "Sou um usuário fictício.",
	"user_type": "anunciante",
	"cpf": "123.456.789-00",
	"user_image": "caminho/para/imagem.jpg",
	"reset_token": null
}
```
### GET /users

- **Descrição**: Obtém a lista de todos os usuários.
- **Como acessar**: Faça uma requisição GET para /users.

**Retorno**:
```
Status Code:200
[
	{
		"id": 1,
		"name": "João da Silva",
		"email": "joao.silva@example.com",
		"phone": "555-123-4567",
		"birthday": "1990-05-15",
		"description": "Sou um usuário fictício.",
		"user_type": "anunciante",
		"password": "$2a$10$2O.bg/9TvBTqEJNIQUullOkweTNgQULKJXURFPIyaFfTpz8AHZ..S",
		"cpf": "123.456.789-00",
		"user_image": "caminho/para/imagem.jpg",
		"reset_token": null
	},
	{
		"id": 2,
		"name": "Maria Souza",
		"email": "maria.souza@example.com",
		"phone": "555-987-6543",
		"birthday": "1985-08-20",
		"description": "Usuária fictícia número dois.",
		"user_type": "comprador",
		"password": "$2a$10$c8LDcnNt79dianz/4x4gA.9OPHzqC9di7n/evvxKeQHBQhhNatYLO",
		"cpf": "987.654.321-00",
		"user_image": "caminho/para/imagem2.jpg",
		"reset_token": null
	}
]
```

### GET /users/:id

- **Descrição**: Obtém informações de um usuário específico com base no ID.
- **Como acessar**: Faça uma requisição GET para /users/:id, substituindo ":id" pelo ID do usuário desejado.

**Retorno**:
```
Status Code:200
	{
		"id": 1,
		"name": "João da Silva",
		"email": "joao.silva@example.com",
		"phone": "555-123-4567",
		"birthday": "1990-05-15",
		"description": "Sou um usuário fictício.",
		"user_type": "anunciante",
		"password": "$2a$10$2O.bg/9TvBTqEJNIQUullOkweTNgQULKJXURFPIyaFfTpz8AHZ..S",
		"cpf": "123.456.789-00",
		"user_image": "caminho/para/imagem.jpg",
		"reset_token": null
	}
```

### PATCH /users/:id

- **Descrição**: Atualiza as informações de um usuário específico.
- **Como acessar**: Faça uma requisição PATCH para /users/:id, substituindo ":id" pelo ID do usuário a ser atualizado e envie o Bearer Token no cabeçalho.

**Envio**:
```
{
	"name":"Severino da Silva",
	"phone": "4002-8922"
}
```

**Retorno**:
```
Status Code:200
{
	"id": 1,
	"name": "Severino da Silva",
	"email": "joao.silva@example.com",
	"phone": "4002-8922",
	"birthday": "1990-05-15",
	"description": "Sou um usuário fictício.",
	"user_type": "anunciante",
	"cpf": "123.456.789-00",
	"user_image": "caminho/para/imagem.jpg",
	"reset_token": null
}
```

### DELETE /users/:id

- **Descrição**: Exclui um usuário específico com base no ID.
- **Como acessar**: Faça uma requisição DELETE para /users/:id, substituindo ":id" pelo ID do usuário a ser excluído e passar o Bearer Token.

**Retorno**:
```
Status Code:200

```

### POST /users/resetPassword

- **Descrição**: Solicita uma redefinição de senha para um usuário.
- **Como acessar**: Faça uma requisição POST para /users/resetPassword.

**Envio**:
```
{
	"email":"joao.silva@example.com"
}
```

**Retorno**:
```
Status Code:200
{
	"message": "Token sended for your email."
}
```

### PATCH /users/resetPassword/token

- **Descrição**: Redefine a senha de um usuário com base no token recebido.
- **Como acessar**: Faça uma requisição PATCH para /users/resetPassword/:token.

**Envio**:
```
{
	"password":"novasenhaUlt1"
}
```

**Retorno**:
```
Status Code:200
{
	"message": "This password are changed with success."
}
```

## Endereços

### POST /adresses/:userId

- **Descrição**: Cria um novo endereço.
- **Como acessar**: Faça uma requisição POST para /adresses com os dados do novo endereço no corpo da requisição e mandar token Bearer do usuário.
- 
**Envio**:
```
{
  "CEP": "12345678",
  "state": "California",
  "city": "Los Angeles",
  "street": "123 Main St",
  "number": "42",
  "complement": "Apt 301"
}
```

**Retorno**:
```
Status Code: 201

{
	"id": 1,
	"CEP": "12345678",
	"state": "California",
	"city": "Los Angeles",
	"street": "123 Main St",
	"number": "42",
	"complement": "Apt 301",
	"user_id": 1
}

```

### PATCH /adresses/:id

- **Descrição**: Atualiza as informações de um endereço específico.
- **Como acessar**: Faça uma requisição PATCH para /adresses/:id, substituindo ":id" pelo ID do endereço a ser atualizado e o token Bearer.

**Envio**:
```
{
  "CEP": "98765432",
  "state": "New York",
  "city": "New York City",
  "street": "Broadway",
  "number": "789",
  "complement": "Suite 200"
}
```

**Retorno**:
```
Status Code: 200
{
	"id": 1,
	"CEP": "98765432",
	"state": "New York",
	"city": "New York City",
	"street": "Broadway",
	"number": "789",
	"complement": "Suite 200",
	"user_id": 1
}

```

## Autenticação

### POST /login

- **Descrição**: Autentica um usuário e gera um token de acesso.
- **Como acessar**: Faça uma requisição POST para /login com as credenciais do usuário no corpo da requisição.

**Envio**:
```
{
	"email":"joao.silva@example.com",
	"password":"senha1234561"
}
```

**Retorno**:
```
Status Code: 201
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiY29tcHJhZG9yIiwidXNlckVtYWlsIjoianVhbmZhcmlhc3RrQGdtYWlsLmNvbSIsImlhdCI6MTY5NzU1MTU4OCwiZXhwIjoxNjk3NTU1MTg4LCJzdWIiOiIyIn0.T3fJRtNTSoJuet8al-3z6zSSS1efz65gMLJYN-pU7t4"
}
```

## Anúncios

### POST /anouncements

- **Descrição**: Cria um novo anúncio.
- **Como acessar**: Faça uma requisição POST para /anouncements com os dados do novo anúncio no corpo da requisição enviando o token do usuário que seja do tipo ANUNCIANTE.

**Envio**:
```
{
  "brand": "Toyota",
  "model": "Camry",
  "year": "2022",
  "fuel": "flex",
  "mileage": "30,000 miles",
  "color": "Silver",
  "fipe_price": "25000.00",
  "price": "28000.00",
  "description": "Excellent condition, low mileage, well-maintained.",
  "cover_image": "car-image.jpg"
}
```

**Retorno**:
```
Status Code:201
{
	"id": 1,
	"brand": "Toyota",
	"model": "Camry",
	"year": "2022",
	"fuel": "flex",
	"mileage": "30,000 miles",
	"color": "Silver",
	"fipe_price": "25000.00",
	"price": "28000.00",
	"description": "Excellent condition, low mileage, well-maintained.",
	"cover_image": "car-image.jpg",
	"user_id": 1
}
```

### GET /anouncements

- **Descrição**: Obtém a lista de todos os anúncios.
- **Como acessar**: Faça uma requisição GET para /anouncements.

**Retorno**:
```
Status Code: 200
[
	{
		"id": 1,
		"brand": "Toyota",
		"model": "Camry",
		"year": "2022",
		"fuel": "flex",
		"mileage": "30,000 miles",
		"color": "Silver",
		"fipe_price": "25000.00",
		"price": "28000.00",
		"description": "Excellent condition, low mileage, well-maintained.",
		"cover_image": "car-image.jpg",
		"user_id": 1
	}
]
```

### GET /anouncements/:id

- **Descrição**: Obtém informações de um anúncio específico com base no ID.
- **Como acessar**: Faça uma requisição GET para /anouncements/:id, substituindo ":id" pelo ID do anúncio desejado.

**Retorno**:
```
Status Code: 200
{
	"id": 1,
	"brand": "Toyota",
	"model": "Camry",
	"year": "2022",
	"fuel": "flex",
	"mileage": "30,000 miles",
	"color": "Silver",
	"fipe_price": "25000.00",
	"price": "28000.00",
	"description": "Excellent condition, low mileage, well-maintained.",
	"cover_image": "car-image.jpg",
	"user_id": 1
}
```

### PATCH /anouncements/:id

- **Descrição**: Atualiza as informações de um anúncio específico.
- **Como acessar**: Faça uma requisição PATCH para /anouncements/:id, substituindo ":id" pelo ID do anúncio a ser atualizado e passando o token Bearer do usuário que criou o anuncio.

**Envio**:
```
{
	"brand":"Honda",
	"model":"Civic SI"
}
```

**Retorno**:
```
Status Code: 200
{
	"id": 1,
	"brand": "Honda",
	"model": "Civic SI",
	"year": "2022",
	"fuel": "flex",
	"mileage": "30,000 miles",
	"color": "Silver",
	"fipe_price": "25000.00",
	"price": "28000.00",
	"description": "Excellent condition, low mileage, well-maintained.",
	"cover_image": "car-image.jpg",
	"user_id": 1
}
```

### DELETE /anouncements/:id

- **Descrição**: Exclui um anúncio específico com base no ID.
- **Como acessar**: Faça uma requisição DELETE para /anouncements/:id, substituindo ":id" pelo ID do anúncio a ser excluído e passando o token Bearer do usuário que criou o anuncio.

**Retorno**:
```
Status Code: 200
```
## Comentários

### POST /comments

- **Descrição**: Cria um novo comentário.
- **Como acessar**: Faça uma requisição POST para /comments com os dados do novo comentário no corpo da requisição.


**Envio**:
```
{
  "comment": "This is a great car!",
  "user_id": "1", 
  "anouncement_id": "1" 
}
```

**Retorno**:
```
Status Code: 201
{
		"id": 1,
		"comment": "This is a great car!",
		"user_id": 1,
		"anouncement_id": 1,
		"created_at": "2023-10-17T19:10:03.343Z",
}
```

### GET /comments

- **Descrição**: Obtém a lista de todos os comentários.
- **Como acessar**: Faça uma requisição GET para /comments.

**Retorno**:
```
Status Code: 201
[
	{
		"id": 1,
		"comment": "This is a great car!",
		"user_id": 1,
		"anouncement_id": 1,
		"created_at": "2023-10-17T19:10:03.343Z",
		"user": {
			"id": 1,
			"name": "Maria Souza",
			"email": "maria.souza@example.com",
			"phone": "555-987-6543",
			"birthday": "1985-08-20",
			"description": "Usuária fictícia número dois.",
			"user_type": "comprador",
			"password": "$2a$10$.sRkI8yceJ6Q7jMINl0yKu0YJIMb.2svGL7XB8wRv5KPNpC8GvNcC",
			"cpf": "987.654.321-00",
			"user_image": "caminho/para/imagem2.jpg",
			"reset_token": null
		}
	},
]
```

### GET /comments/:id

- **Descrição**: Obtém informações de um comentário específico com base no ID de um Anuncio.
- **Como acessar**: Faça uma requisição GET para /comments/:id, substituindo ":id" pelo ID do comentário desejado.

**Retorno**
```
Status Code:200
[
	{
		"id": 1,
		"comment": "This is a great car!",
		"user_id": 2,
		"anouncement_id": 2,
		"created_at": "2023-10-17T19:10:03.343Z",
		"user": {
			"id": 2,
			"name": "Maria Souza",
			"email": "maria.souza@example.com",
			"phone": "555-987-6543",
			"birthday": "1985-08-20",
			"description": "Usuária fictícia número dois.",
			"user_type": "comprador",
			"password": "$2a$10$.sRkI8yceJ6Q7jMINl0yKu0YJIMb.2svGL7XB8wRv5KPNpC8GvNcC",
			"cpf": "987.654.321-00",
			"user_image": "caminho/para/imagem2.jpg",
			"reset_token": null
		}
	},
	{
		"id": 3,
		"comment": "This is a ugly car! bleh!",
		"user_id": 2,
		"anouncement_id": 2,
		"created_at": "2023-10-17T19:14:17.784Z",
		"user": {
			"id": 2,
			"name": "Maria Souza",
			"email": "maria.souza@example.com",
			"phone": "555-987-6543",
			"birthday": "1985-08-20",
			"description": "Usuária fictícia número dois.",
			"user_type": "comprador",
			"password": "$2a$10$.sRkI8yceJ6Q7jMINl0yKu0YJIMb.2svGL7XB8wRv5KPNpC8GvNcC",
			"cpf": "987.654.321-00",
			"user_image": "caminho/para/imagem2.jpg",
			"reset_token": null
		}
	}
]

```

### PATCH /comments/:id

- **Descrição**: Atualiza as informações de um comentário específico.
- **Como acessar**: Faça uma requisição PATCH para /comments/:id, substituindo ":id" pelo ID do comentário a ser atualizado.

**Envio**:
```
{
  "comment": "This is a nice car, very well!"
}
```

**Retorno**:
```
Status Code: 200
{
	"id": 1,
	"comment": "This is a nice car, very well!",
	"user_id": 2,
	"anouncement_id": 2,
	"created_at": "2023-10-17T19:10:03.343Z"
}
```

### DELETE /comments/:id

- **Descrição**: Exclui um comentário específico com base no ID.
- **Como acessar**: Faça uma requisição DELETE para /comments/:id, substituindo ":id" pelo ID do comentário a ser excluído.
  
**Retorno**:
```
Status Code: 200

```

## Imagens

### POST /images

- **Descrição**: Envia uma nova imagem.
- **Como acessar**: Faça uma requisição POST para /images com a imagem a ser enviada no corpo da requisição.
- 
**Envio**:
```
{
  "image_url": "URL_da_Imagem",
  "anouncement_id": 2
}
```

**Retorno**:
```
Status Code:201
{
	"id": 1,
	"image_url": "URL_da_Imagem",
	"anouncement_id": 2
}
```

### GET /images/:id

- **Descrição**: Obtém as imagens específicas de um anuncio com base no ID.
- **Como acessar**: Faça uma requisição GET para /images/:id, substituindo ":id" pelo ID do anuncio.

**Retorno**:
```
Status Code: 200
[
	{
		"id": 1,
		"image_url": "URL_da_Imagem",
		"anouncement_id": 2
	},
	{
		"id": 2,
		"image_url": "URL_da_Imagem2",
		"anouncement_id": 2
	}
]
```
### PATCH /images/:id

- **Descrição**: Atualiza uma imagem específica com base no ID.
- **Como acessar**: Faça uma requisição PATCH para /images/:id, substituindo ":id" pelo ID da imagem a ser atualizada.

**Envio**:
```
{
  "image_url": "URL_da_Imagem1.Novo.png"
}
```

**Retorno**:
```
Status Code:200
{
	"id": 1,
	"image_url": "URL_da_Imagem1.Novo.png",
	"anouncement_id": 2
}
```

##
Nest is [MIT licensed](LICENSE).
