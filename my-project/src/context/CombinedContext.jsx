export default function CombinedProvider(...Providers) {
  //providers is array which contains all providers

  return ({ children }) => {
    return Providers.reduceRight((accumulator, CurrentProvoder) => {
      return <CurrentProvoder>{accumulator}</CurrentProvoder>;
    }, children);
  };
}