const TitleLine = ({ title, className = "" }) => {
  return (
    <section className={className}>
      <h1>{title}</h1>
      <div className="min-w-[20rem] h-0.5 bg-gradient-to-r from-transparent via-[#ff2a70] to-transparent"></div>
    </section>
  );
};

export default TitleLine;
