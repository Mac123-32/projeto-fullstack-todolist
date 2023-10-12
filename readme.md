link do video: https://youtu.be/YVsNVPFOEuk

primeiro ele instala o cors no backend para dar acesso ao frontend e depois adiciona no cors a função para aceitar o front
no backend voce adiciona o cors da seguinte forma
const cors = require('cors');
...
app.use(express.json());
app.use(cors());
...