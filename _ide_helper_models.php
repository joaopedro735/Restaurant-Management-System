<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App{
/**
 * App\Invoice
 *
 * @property int $id
 * @property string $state
 * @property int $meal_id
 * @property string|null $nif
 * @property string|null $name
 * @property string $date
 * @property float $total_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereMealId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereNif($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereTotalPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereUpdatedAt($value)
 */
	class Invoice extends \Eloquent {}
}

namespace App{
/**
 * App\Item
 *
 * @property int $id
 * @property string $name
 * @property string $type
 * @property string $description
 * @property string $photo_url
 * @property float $price
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item wherePhotoUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Item whereUpdatedAt($value)
 */
	class Item extends \Eloquent {}
}

namespace App{
/**
 * App\Meal
 *
 * @property int $id
 * @property string $state
 * @property int $table_number
 * @property string $start
 * @property string|null $end
 * @property int $responsible_waiter_id
 * @property float $total_price_preview
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Invoice $invoice
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Order[] $orders
 * @property-read \App\User $waiter
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal whereEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal whereResponsibleWaiterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal whereStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal whereTableNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal whereTotalPricePreview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Meal whereUpdatedAt($value)
 */
	class Meal extends \Eloquent {}
}

namespace App{
/**
 * App\Order
 *
 * @property int $id
 * @property string $state
 * @property int $item_id
 * @property int $meal_id
 * @property int|null $responsible_cook_id
 * @property string $start
 * @property string|null $end
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Item $item
 * @property-read \App\User $responsibleCook
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereMealId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereResponsibleCookId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereUpdatedAt($value)
 */
	class Order extends \Eloquent {}
}

namespace App{
/**
 * App\PasswordReset
 *
 * @property string $email
 * @property string $token
 * @property string|null $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PasswordReset newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PasswordReset newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PasswordReset query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PasswordReset whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PasswordReset whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PasswordReset whereToken($value)
 */
	class PasswordReset extends \Eloquent {}
}

namespace App{
/**
 * App\Table
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Table newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Table newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Table query()
 */
	class Table extends \Eloquent {}
}

namespace App{
/**
 * App\User
 *
 * @property int $id
 * @property string $name
 * @property string $username
 * @property string $email
 * @property string|null $email_verified_at
 * @property string $password
 * @property string $type
 * @property int $blocked
 * @property string|null $photo_url
 * @property string|null $last_shift_start
 * @property string|null $last_shift_end
 * @property int $shift_active
 * @property string|null $deleted_at
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[] $clients
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Order[] $orders
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereBlocked($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLastShiftEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLastShiftStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePhotoUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereShiftActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUsername($value)
 */
	class User extends \Eloquent {}
}

