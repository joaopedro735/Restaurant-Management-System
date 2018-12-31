<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice - #{{ $invoice->id }}</title>

    <style type="text/css">
        @page {
            margin: 0px;
        }

        body {
            margin: 0px;
        }

        * {
            font-family: Verdana, Arial, sans-serif;
        }

        a {
            color: #fff;
            text-decoration: none;
        }

        table {
            font-size: x-small;
        }

        tfoot tr td {
            font-weight: bold;
            font-size: x-small;
        }

        .invoice table {
            margin: 15px;
        }

        .invoice h3 {
            margin-left: 15px;
        }

        .information {
            background-color: #60A7A6;
            color: #FFF;
        }

        .information .logo {
            margin: 5px;
        }

        .information table {
            padding: 10px;
        }
    </style>

</head>
<body>

<div class="information">
    <table width="100%">
        <tr>
            <td align="left" style="width: 40%;">
                <h3>{{ $invoice->name }}</h3>
                <pre>
NIF: {{ $invoice->nif }}
<br/><br/>
Date: {{ $invoice->date }}
Status: {{ ucfirst($invoice->state) }}
                </pre>

            </td>
            <td align="center">
                <img src="{{ asset('storage/logo_transparent.png') }}" alt="Logo" width="128" class="logo"/>
            </td>
            <td align="right" style="width: 40%;">

                <h3>Restaurantte</h3>
{{ config('app.url') }}
                <pre>
                    Waiter: {{ $invoice->meal->waiter->name }}
                </pre>
            </td>
        </tr>

    </table>
</div>


<br/>

<div class="invoice">
    <h3>Invoice ID #{{ $invoice->id }}</h3>
    <table width="100%">
        <thead>
        <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Total</th>
        </tr>
        </thead>
        <tbody>
        @foreach($invoice->items as $item)
            <tr>
                <td>{{ $item->name }}</td>
                <td>{{ $item->pivot->quantity }}</td>
                <td align="left">€{{ $item->pivot->unit_price }}</td>
                <td align="left">€{{ $item->pivot->sub_total_price }}</td>
            </tr>
        @endforeach
        </tbody>

        <tfoot>
        <tr>
            <td colspan="2"></td>
            <td align="left">Total</td>
            <td align="left" class="gray">€{{ $invoice->total_price }}</td>
        </tr>
        </tfoot>
    </table>
</div>

<div class="information" style="position: absolute; bottom: 0;">
    <table width="100%">
        <tr>
            <td align="left" style="width: 50%;">
                &copy; {{ date('Y') }} {{ config('app.url') }} - All rights reserved.
            </td>
            <td align="right" style="width: 50%;">
                The restaurant for you
            </td>
        </tr>

    </table>
</div>
</body>
</html>