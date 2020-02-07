const APIGit = require('../services/GitHubService')
const APIFace = require('../services/FaceBookService')
const Dados = require('../model/dados')

class CurriculoController {
    async get(req, res, next) {
        try {
            
            const ApiFace = await APIFace.get(
                `/me?fields=id%2Cfirst_name%2Clast_name%2Cgender%2Cbirthday%2Cemail%2Clocation&access_token=${process.env.FACEBOOK_TOKEN}`
            );
            const ApiGitUser = await APIGit.request("/user");
            const ApiGitRep = await APIGit.request("/user/repos");
            
            const { name: login, birthday, location, email, gender } = ApiFace.data;
            const { bio, avatar_url, html_url } = ApiGitUser.data;
            
            const result = ApiGitRep.data.map(repo => {
                let Repositorios = {
                    size: repo.size,
                    name: repo.name,
                    url: repo.url
                };
                return Repositorios;
            });

            const qtdRepo = result.splice(0, 3).sort((a, b) => {
                if (a.size < b.size) return 1;
                if (a.size > b.size) return -1;
                return 0;
            });

            const profile = {
                "Curriculo Vitae" : {
                    nome: "Bruno",
                    data_nascimento: birthday,
                    endereço: location.name,
                    genero: gender === "male" ? "masculino" : "feminino",
                    email: email,
                    bio: bio,
                    foto: avatar_url,
                    formacao: Dados.formacao,
                    experiencia_profissional: Dados.experiencia_profissional
                },
                github: {
                    perfil: html_url,
                    alguns_repositorios: qtdRepo
                }
            };
            return res.json(profile);
        } catch (error) {
           return (error);
        }
    }
}

module.exports = new CurriculoController();
