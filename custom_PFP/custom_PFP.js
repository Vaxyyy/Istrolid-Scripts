function custom_PFP() {
    saved_PFP = {
        Dreamlight: `<img src="https://cdn.discordapp.com/attachments/693009932932349993/745835671230611528/niko_smile.png?size=128" width="20" height="20">`,
        IstroChat: `<img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/198142ac-f410-423a-bf0b-34c9cb5d9609/dbtif5j-60306864-d6b7-44b6-a9ff-65e8adcfb911.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMTk4MTQyYWMtZjQxMC00MjNhLWJmMGItMzRjOWNiNWQ5NjA5XC9kYnRpZjVqLTYwMzA2ODY0LWQ2YjctNDRiNi1hOWZmLTY1ZThhZGNmYjkxMS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.W3KM95rnj_ofajggtIrj5DA6xNti742Ho-VWcV1uYd4" width="20" height="20">`,
        Vaxy: '<img src="https://cdn.discordapp.com/avatars/631395619000549408/f8254af039ebaf9c340b8760b3770e84.png?size=128" width="20" height="20">',
        Ecclesiarch: '<img src="https://cdn.discordapp.com/avatars/148502275755606018/32489338b7bd3cc6be402d124fa461e5.png?size=128" width="20" height="20">',
        Snully: '<img src="https://cdn.discordapp.com/avatars/277041856687243265/99c62a2f5c74fd3fbde29721ba4e439f.png?size=128" width="20" height="20">',
        EndSpirits: '<img src="https://cdn.discordapp.com/avatars/479347856717643776/639fe795427eeedcbff70c338b8f866f.png?size=128" width="20" height="20">',
        SteelyMite: '<img src="https://cdn.discordapp.com/avatars/240765436130623489/45997112fbba71f84d167989f252b78c.png?size=128" width="20" height="20">',
        Godde: '<img src="https://cdn.discordapp.com/avatars/178635836781232128/b435940c99fc18c521087d83d5db8232.png?size=128" width="20" height="20">',
        Thinky: '<img src="https://cdn.discordapp.com/avatars/209415722827382786/a_792cbe299dc1029f1724d0460d17df69.gif?size=128" width="20" height="20">',
        Greywolf208: '<img src="https://cdn.discordapp.com/avatars/189534690930065408/7b0460eac9975195be4c7bd976727cfc.png?size=128" width="20" height="20">',
        TheProtoss: '<img src="https://cdn.discordapp.com/avatars/263087759571288067/6988b78684739bb82f6c03fab1b207ed.png?size=128" width="20" height="20">',
        Iarsi: '<img src="https://cdn.discordapp.com/avatars/237164761832357890/946b91288f2a3db4542db57fdaa0e1e7.png?size=128" width="20" height="20">',
        AIassimilator: '<img src="https://cdn.discordapp.com/avatars/392593613575684096/72c2795027b5a823a912fd21a866211b.png?size=128" width="20" height="20">',
        CyborgHornet: '<img src="https://cdn.discordapp.com/avatars/674707988581187668/ebd0e7ce2b0ccc5612bf1dc44279bb27.png?size=128" width="20" height="20">',
        Pope: '<img src="https://cdn.discordapp.com/avatars/213250702141554688/6fb143181635b10a32b64089839b75e7.png?size=128" width="20" height="20">',
        //name: '<img src="png" width="20" height="20">',
    };
    for (var playerChip of document.getElementsByClassName("playerChip")) {
        namefull = playerChip.innerText;
        name = namefull.substring(100, namefull.indexOf(']') + 1);

        for (var l in saved_PFP) {
            if (l === name) {
                playerChip.firstChild.innerHTML = saved_PFP[l]
            };
        };
    };
};

setInterval(() => {
    custom_PFP()
}, 10);
