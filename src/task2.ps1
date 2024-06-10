if ($PSVersionTable.PSEdition -ne 'Core') {
    Write-Host 'This is a PowerShell Core script and is not compatible with Windows PowerShell'
    exit 1
}

$orders_file = "orders.csv"
$product_customers_file = "product_customers.csv"

$orders = (Import-CSV $orders_file | Select-Object customer, products)
$product_customers = @{}
$orders | ForEach-Object {
    $customer = $_.customer
    $_.products.split(' ') | ForEach-Object {
        if (-not $product_customers.ContainsKey($_)) {
            $product_customers[$_] = [System.Collections.Generic.HashSet[int]]@()
        }
        
        $null = $product_customers[$_].Add($customer)
    }
}

# optional sorting (not part of the task, but nice to have for readability of the results)
$product_customers = ($product_customers.GetEnumerator() | Sort-Object -Property Name)
$product_customers | ForEach-Object {
    $_.Value = ($_.Value.GetEnumerator() | Sort-Object) -Join ' '
}

'id,customer_ids' | Out-File $product_customers_file 
$product_customers | Select-Object Name, Value | ConvertTo-Csv -NoTypeInformation -UseQuotes Never | Select-Object -Skip 1 | Out-File $product_customers_file -Append