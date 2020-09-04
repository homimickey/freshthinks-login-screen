handleSubmit = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, pass)
            .then((userCred) => {
                userCred.user.getIdTokenResult(true)
                .then((tokenRes) => {
                    if (!!tokenRes.claims.admin) {
                        setloading(true)
                        setCookie("idtoken", tokenRes.token, 1);
                        window.location.replace(urlDispatcher("home"));
                    } else {
                        setloading(true)
                        window.location.replace(urlDispatcher("ofa"));
                    }
                })
            })
            .catch((err) => {
                if (err.code === "auth/wrong-password") {
                    setmistake(true);
                } else {
                    setmistake(false);
                    setloading(true)
                    window.location.replace(urlDispatcher("error"));
                }
            });
        setEmail("");
        setPass("");
    };