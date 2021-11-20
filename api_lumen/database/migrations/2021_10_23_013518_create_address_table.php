<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('address', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo',['Residencial', 'Empresarial','Cobrança','Outro']);
            $table->string('cep',8);
            $table->string('logradouro');
            $table->string('complemento')->nullable();
            $table->string('numero',10);
            $table->string('bairro');
            $table->string('localidade');
            $table->string('uf',2);
            $table->integer('user_id')->unique();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('RESTRICT')->onDelete('CASCADE');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('address');
    }
}
