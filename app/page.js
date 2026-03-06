const analyze = async () => {
  if (!file) {
    setResult("Veuillez sélectionner une image.");
    return;
  }

  setLoading(true);

  const reader = new FileReader();

  reader.onloadend = async () => {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: reader.result
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data.details || data.result || "Erreur lors de l’analyse.");
        setLoading(false);
        return;
      }

      setResult(data.result || "Aucun résultat.");
    } catch (error) {
      setResult(error.message || "Erreur lors de l’analyse.");
    }

    setLoading(false);
  };

  reader.readAsDataURL(file);
};
