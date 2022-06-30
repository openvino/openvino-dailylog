import * as ethers from "ethers";

export function formatEth(amount: any, decimals: number = 2): string {
  if (amount === null) return "0";

  let valueDisplayed = String(
    Number(
      ethers.utils.formatEther(
        typeof amount === "number"
          ? amount.toLocaleString("fullwide", { useGrouping: false })
          : String(amount)
      )
    )
  );

  const value = Number(valueDisplayed);

  if (Math.floor(value) !== value) {
    const decimalCount = value.toString().split(".")[1].length;
    valueDisplayed = value.toFixed(Math.min(decimalCount, decimals));
  }

  return valueDisplayed;
}
