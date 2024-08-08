import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  if (!id) {
    // A) CREATE
    const { data: createData, error: createError } = await query
      .insert([{ ...newCabin, image: imagePath }])
      .select();

    if (createError) {
      console.error(createError);
      throw new Error("Cabin could not be created");
    }

    // 2. Upload image if necessary
    if (!hasImagePath) {
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

      // 3. Delete the cabin IF there was an error uploading the image
      if (storageError) {
        await supabase.from("cabins").delete().eq("id", createData[0].id);
        console.error(storageError);
        throw new Error(
          "Cabin image could not be uploaded and the cabin was not created"
        );
      }
    }

    return createData;
  } else {
    // B) EDIT
    const { data: updateData, error: updateError } = await query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

    if (updateError) {
      console.error(updateError);
      throw new Error("Cabin could not be updated");
    }

    // 2. Upload image if necessary
    if (!hasImagePath) {
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

      // 3. Delete the cabin IF there was an error uploading the image
      if (storageError) {
        await supabase.from("cabins").delete().eq("id", id);
        console.error(storageError);
        throw new Error(
          "Cabin image could not be uploaded and the cabin was not updated"
        );
      }
    }

    return updateData;
  }
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
